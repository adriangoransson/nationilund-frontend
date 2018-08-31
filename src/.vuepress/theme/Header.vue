<template>
  <header>
    <div class="container">
      <router-link to="/" class="logo">
        <img class="logo" src="/logo.svg" :alt="$siteTitle">
      </router-link>

      <nav class="menu">
        <HeaderLink v-for="item in navItems" :key="item.link" :item="item" />
      </nav>
    </div>
  </header>
</template>

<script>
import HeaderLink from './HeaderLink.vue';

export default {
  components: { HeaderLink },

  computed: {
    navItems() {
      return this.$site.themeConfig.nav;
    },
  },
};
</script>
