<template>
  <div class="events">
    <div
      v-if="filteredAmount > 0"
      @click="filterDisabled = true"
      class="event centered"
    >
      {{ filteredAmount }} earlier {{ filteredAmount === 1 ? 'event' : 'events' }}
    </div>
    <event v-for="event in events" :key="event.id" :data="event" />

    <p v-if="!events.length" class="centered">
      No events 😔
    </p>
  </div>
</template>

<script>
import { isToday, parseISO } from 'date-fns';

const apiError = (status) => {
  switch (status) {
    case 400:
      return 'Date was incorrectly formatted. Please reload the page.';
    case 429:
      return `Take it easy! Your IP is doing too many requests right now.`
    case 502:
      return 'Bad API response. Maybe studentlund.se is down?';
    case 503:
      return 'Looks like the api is having trouble serving your data.';
  }
};

export default {
  props: {
    date: String,
  },

  data() {
    return {
      currentPromise: null,
      data: [],
      filterDisabled: false,
    };
  },

  watch: {
    date() {
      this.filterDisabled = false;
      this.load();
    },
  },

  created() {
    this.load();
  },

  computed: {
    filter() {
      if (this.filterDisabled) {
        return false;
      }

      return isToday(parseISO(this.date));
    },

    filteredAmount() {
      return this.data.length - this.events.length;
    },

    events() {
      if (this.filter) {
        const filtered = this.data.filter(event => Date.parse(event.date.end) > new Date());

        if (filtered.length) {
          return filtered;
        }
      }

      return this.data;
    },
  },

  methods: {
    async load() {
      if (!this.date) {
        console.log('No date set');
        return;
      }

      this.$emit('loading', true);
      this.$emit('error', null);

      const promise = fetch(`https://qibf0o2lib.execute-api.eu-north-1.amazonaws.com/production/day/${this.date}`);

      this.currentPromise = promise;

      let response;
      try {
        response = await promise;
      } catch (error) {
        this.$emit('error', error);
        this.$emit('loading', false);
      }

      if (!response.ok) {
        this.$emit('error', `${apiError(response.status)} (HTTP status code ${response.status})`);
        this.$emit('loading', false);
        return;
      }

      // Disregard if the response isn't for our latest request
      if (promise === this.currentPromise) {
        try {
          this.data = await response.json();
        } catch (error) {
          this.$emit('error', error);
        } finally {
          this.$emit('loading', false);
        }
      }
    },
  },
};
</script>
