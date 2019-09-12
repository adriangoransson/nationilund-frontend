<template>
  <div class="date-bar">
    <DatePicker :date="date" @change="$emit('change', $event)" />
    <div class="date-navigation">
      <div class="link-wrapper">
        <a @click="setDate(-1)" class="date previous-date">{{ relativeDate(-1) }}</a>
        <span class="date current-date">{{ relativeDate() }}</span>
        <a @click="setDate(+1)" class="date next-date">{{ relativeDate(1) }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { addDays, differenceInCalendarDays, parseISO } from 'date-fns';
import { formatDate, apiDateFormat } from '../utils';

export default {
  props: {
    date: String,
  },

  methods: {
    // For server rendering
    relativeDate(increment = 0) {
      const date = this.date !== null ? parseISO(this.date) : new Date();
      return this.d(addDays(date, increment));
    },

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
      this.$emit('change', apiDateFormat(addDays(parseISO(this.date), increment)));
    },
  },
};
</script>
