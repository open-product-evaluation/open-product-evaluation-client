<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FavoriteOption extends Vue {
  @Prop() private msg = 'FavoriteOption';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>