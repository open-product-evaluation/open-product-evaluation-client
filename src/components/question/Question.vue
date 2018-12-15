<template>
  <div>
    <h1>Question</h1>
    <questionItem></questionItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QuestionItem from '@/components/question/QuestionItem.vue';
import { Route } from 'vue-router';

const store = '$store';
const route = '$route';

export default {
  name: 'Question',
  components: {
    'questionItem': QuestionItem,
  },
  created() {
    let contextID= this[route].params.cID;
    this[store].dispatch('getSurvey', {
        context: contextID,
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
