<template>
  <div>
    <DateBar :date="date" @change="dateChanged" />

    <LoadingIndicator v-if="loading" />

    <p v-else-if="this.error" class="centered error">
      Error!<br>
      {{ this.error }}
    </p>

    <ClientOnly>
      <EventsList
        v-if="date && !this.error"
        v-show="!loading"
        :date="date"
        @loading="loading = $event"
        @error="error = $event"
      />
    </ClientOnly>
  </div>
</template>

<script>
import { parseISO } from 'date-fns';
import { validDate, apiDateFormat } from '../utils';

export default {
  data() {
    return {
      date: null,
      error: null,
      loading: true,
    };
  },

  watch: {
    '$route': 'routeChanged',
  },

  created() {
    this.validateRoute();
  },

  methods: {
    validateRoute() {
      const query = this.$route.query.d;
      if (validDate(query)) {
        this.date = query;
      } else {
        this.resetURL();
      }
    },

    dateChanged(date) {
      this.error = null;
      this.$router.push({
        to: '/',
        query: {
          d: date,
        },
      });
    },

    routeChanged() {
      this.validateRoute();
    },

    resetURL() {
      this.$router.replace({
        to: '/',
        query: {
          d: apiDateFormat(new Date()),
        },
      });
    },
  },
};
</script>

<style>
  .error {
    padding: 20px 0;
  }
</style>
