<template>
  <button ref="button" class="date-picker-button">
    <img src="../assets/calendar.svg">
  </button>
</template>

<script>
import flatpickr from 'flatpickr';

export default {
  props: [ 'date' ],

  data() {
    return {
      picker: null,
    };
  },

  watch: {
    'date': 'setDate',
  },

  mounted() {
    this.picker = flatpickr(this.$refs.button, {
      disableMobile: true,
      defaultDate: this.date,
      onChange: (selected, dateStr) => {
        this.$emit('change', dateStr);
      },
    });
  },

  methods: {
    setDate() {
      this.picker.setDate(this.date);
    },
  },

  beforeDestroy() {
    this.picker.destroy();
  },
};
</script>

<style scoped>
  .date-picker-button {
    -webkit-appearance: none;
    border: none;
    border-left: 1px solid #F3F3F3;
    border-right: 1px solid #F3F3F3;
    background: none;
  }
</style>

<style lang="css" src="flatpickr/dist/flatpickr.css">
</style>
