<template>
  <div class="hello">
    <h1>Open Product Evaluation</h1>
    <h2>{{msg}}</h2>
    <p>
      OPE - und alles ist okay!
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SurveyList extends Vue {
  @Prop() private msg = 'SurveyListe';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
