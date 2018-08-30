<template>
  <div>
    <date-bar :date="date" @change="dateChange($event)" />

    <loading-indicator v-if="loading" />
    <div v-else class="events">
      <event v-for="event in events" :key="event.id" :data="event" />
    </div>
  </div>
</template>

<script>
import { validDate, apiDateFormat } from '../utils';

export default {
  data() {
    return {
      loading: false,
      currentPromise: null,
      events: [],
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
      const promise = fetch(`https://api.nationilund.se/day/${this.date}`);

      this.currentPromise = promise;

      let data;
      try {
        data = await promise;
      } catch (error) {
        this.error = error;
        this.loading = false;
      }

      // Disregard if the response isn't for our latest request
      if (promise === this.currentPromise) {
        try {
          this.events = await data.json();
        } catch (error) {
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
