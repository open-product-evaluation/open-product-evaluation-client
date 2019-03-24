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
  margin: 2px;
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
.step-indicators.step-indicator{
  color: $primaryColor;
  border-color: $primaryColor;
}
.step-indicators-line{
  background: $secondaryBackgroundColor;
}
.progress {
  font-size: 1rem;
  height: max-content;
  border-radius: 0;
}
.progress-bar {
  height: 1.5rem;
  background: $secondaryBackgroundColor;
  opacity: 0.5;
  color: $primaryColor
}
.modal-dialog {
    max-width: 600px;
}
</style>
