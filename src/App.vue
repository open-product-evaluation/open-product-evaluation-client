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
};
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
  min-height: -webkit-fill-available;
  height: 100%; 
}
.btn-primaryBtn {
  background-color: $secondaryBackgroundColor !important;
  min-width: 8rem !important;
  color: white !important;
}
.btn-primaryBtn:hover {
  background-color: $primaryColor !important;
  border-color: $primaryColor !important;
}
.neutral > input, .radio > input{
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 5px;
}
.neutral {
  margin-top: .5rem;
}
</style>
