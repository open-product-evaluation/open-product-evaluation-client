<template>
  <div>
    <h1>Question</h1>
    <questionItem></questionItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QuestionItem from '@/components/question/QuestionItem.vue';

@Component({
  components: {
    questionItem: QuestionItem,
  },
})

export default class Question extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
