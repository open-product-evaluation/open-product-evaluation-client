<template>
  <div id="app">
    <appHeader/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';

export default {
  components: {
    appHeader: Header,
  },
}
</script>

<style lang="scss">
@import "./scss/variables.scss"; 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $backgroundColor;
}
</style>
