<template>
  <div class="date-bar">
    <date-picker :date="date" @change="$emit('change', $event)" />
    <div class="date-navigation">
      <div class="link-wrapper">
        <a @click="setDate(-1)" class="date previous-date">{{ previousDay }}</a>
        <span class="date current-date">{{ currentDay }}</span>
        <a @click="setDate(+1)" class="date next-date">{{ nextDay }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import addDays from 'date-fns/add_days';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import { formatDate, apiDateFormat } from '../utils';

export default {
  props: {
    date: String,
  },

  computed: {
    currentDay() {
      return this.d(this.date);
    },

    nextDay() {
      return this.d(addDays(this.date, 1));
    },

    previousDay() {
      return this.d(addDays(this.date, -1));
    }
  },

  methods: {
    d(date) {
      const diff = differenceInCalendarDays(date, new Date());
      switch (diff) {
        case 0:
          return 'Today';
          break;
        case -1:
          return 'Yesterday';
        case 1:
          return 'Tomorrow';
        default:
          return formatDate(date);
      }
    },

    setDate(increment) {
      this.$emit('change', apiDateFormat(addDays(this.date, increment)));
    },
  },
};
</script>
