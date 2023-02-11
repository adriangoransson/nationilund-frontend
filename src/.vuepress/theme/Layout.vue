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
};
</script>

<style lang="css" src="./style/theme.css"></style>
