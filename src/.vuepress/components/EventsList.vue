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
import { dateRegex, apiDateFormat } from '../utils';

export default {
  data() {
    return {
      loading: false,
      events: [],
      date: apiDateFormat(new Date()),
    };
  },

  watch: {
    '$route': 'routeChange',
  },

  created() {
    this.setURL(this.$route.query.d);
    this.load();
  },

  methods: {
    load() {
      if (this.loading) { return; }

      this.loading = true;
      fetch(`https://api.nationilund.se/day/${this.date}`)
        .then(d => d.json())
        .then((d) => {
          this.events = d;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    setURL(date) {
      if (dateRegex.test(date)) {
        this.date = date;
      } else {
        this.$router.replace({
          to: '/',
          query: {
            d: this.date,
          },
        });
      }
    },

    routeChange() {
      this.setURL(this.$route.query.d);
      this.load();
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
