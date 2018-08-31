<template>
  <div>
    <Header />
    <main class="container">
      <Content />
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import nprogress from 'nprogress';
import Header from './Header.vue';

export default {
  components: { Header },

  mounted() {
    // configure progress bar
    // Copied from vuepress default theme Layout.vue
    nprogress.configure({
      showSpinner: false,
    });

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start();
      }
      next();
    });

    this.$router.afterEach(() => {
      nprogress.done();
    });
  },
};
</script>

<style src="./style/theme.scss"></style>
