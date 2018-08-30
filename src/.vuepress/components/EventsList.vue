<template>
  <div>
    <date-bar :date="date" @change="dateChange($event)" />

    <loading-indicator v-if="loading" />

    <p v-else-if="this.error" class="centered">Error!<br>{{ this.error }}</p>

    <div v-else class="events">
      <event v-for="event in events" :key="event.id" :data="event" />
    </div>
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
  data() {
    return {
      loading: false,
      currentPromise: null,
      events: [],
      error: null,
      date: apiDateFormat(new Date()),
    };
  },

  watch: {
    '$route': 'routeChange',
  },

  computed: {
    urlDate() {
      return this.$route.query.d;
    },

    validURL() {
      return validDate(this.urlDate);
    },
  },

  created() {
    this.loadIfValidURL();
  },

  methods: {
    async load() {
      this.loading = true;
      this.error = null;

      const promise = fetch(`https://api.nationilund.se/day/${this.date}`);

      this.currentPromise = promise;

      let response;
      try {
        response = await promise;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }

      if (!response.ok) {
        this.error = `${apiError(response.status)} (HTTP status code ${response.status})`;
        this.loading = false;
        return;
      }

      // Disregard if the response isn't for our latest request
      if (promise === this.currentPromise) {
        try {
          this.events = await response.json();
        } catch (error) {
          console.log(error);
          this.error = error;
        } finally {
          this.loading = false;
        }
      }
    },

    loadIfValidURL() {
      if (this.validURL) {
        this.date = this.urlDate;
        this.load();
      } else {
        this.setURL(apiDateFormat(new Date()));
      }
    },

    setURL(date) {
      this.$router.replace({
        to: '/',
        query: {
          d: date,
        },
      });
    },

    routeChange() {
      this.loadIfValidURL();
    },

    dateChange(date) {
      this.$router.push({
        to: '/',
        query: {
          d: date,
        },
      });
    },
  },
};
</script>
