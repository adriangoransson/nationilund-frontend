<template>
  <div class="events">
    <div
      v-if="filteredAmount > 0"
      @click="filter = false"
      class="event centered"
    >
      {{ filteredAmount }} earlier events
    </div>
    <event v-for="event in events" :key="event.id" :data="event" />
  </div>
</template>

<script>
import isToday from 'date-fns/is_today';
import { validDate, apiDateFormat } from '../utils';

const apiError = (status) => {
  switch (status) {
    case 400:
      return 'Date was incorrectly formatted. Please reload the page.';
    case 429:
      return `Take it easy! Your IP is doing too many requests right now.`
    case 504:
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
      filter: isToday(this.date),
    };
  },

  watch: {
    date() {
      this.filter = isToday(this.date);
      this.load();
    },
  },

  created() {
    this.load();
  },

  computed: {
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

      const promise = fetch(`https://api.nationilund.se/day/${this.date}`);

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
