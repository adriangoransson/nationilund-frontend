<template>
  <div class="event" :class="classList" @click="toggleOpen">
    <div class="content">
      <p class="time">{{ startTime }} - {{ endTime }}</p>
      <h1 class="title">{{ data.summary }}</h1>
      <span class="plus"></span>
    </div>
    <p v-if="open" class="description">{{ data.description }}</p>
  </div>
</template>

<script>
import { formatHours, slugify } from '../utils';

export default {
  props: ['data'],

  data() {
    return {
      open: false,
    };
  },

  computed: {
    startTime() {
      return formatHours(new Date(this.data.date.start));
    },

    endTime() {
      return formatHours(new Date(this.data.date.end));
    },

    slug() {
      return slugify(this.data.organizer.name);
    },

    classList() {
      const open = this.open ? 'open' : null;
      return [ this.slug, open ];
    },
  },

  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>
