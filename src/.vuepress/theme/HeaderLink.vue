<template>
  <router-link class="menu-item" :to="link">
    {{ item.text }}
  </router-link>
</template>

<script>
import { ensureExt } from './util';

export default {
  props: {
    item: {
      required: true,
    },
  },

  computed: {
    link () {
      return ensureExt(this.item.link);
    },
  },
}
</script>
