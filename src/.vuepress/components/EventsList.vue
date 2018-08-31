<template>
  <div class="events">
    <event v-for="event in events" :key="event.id" :data="event" />
  </div>
</template>

<script>
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
      events: [],
    };
  },

  watch: {
    'date': 'load',
  },

  created() {
    this.load();
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
          this.events = await response.json();
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
