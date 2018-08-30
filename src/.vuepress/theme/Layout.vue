<template>
  <div>
    <Header />
    <main class="container">
      <Content />
    </main>
  </div>
</template>

<style src="./style/reset.css"></style>
<style lang="scss" src="./style/base.scss"></style>

<script>
import Header from './Header.vue';

export default {
  components: { Header },
};
</script>
