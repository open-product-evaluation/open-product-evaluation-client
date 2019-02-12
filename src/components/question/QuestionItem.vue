<template>
  <div class="row items"
       v-if="question.items && question.items.length > 0">
    <div class="col-6 col-sm-4"
         v-for="item in question.items"
         :key="item.id">
      <div class="item"
           :style="{backgroundImage: `url(${item.image.url})`}">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QuestionItem',
  props: {
    id: String,
  },
  computed: {
    question(this: any) {
      return this['$store'].getters.getQuestion(this.id);
    },
  },
};
</script>

<style scoped="true" lang="scss">
.items { margin-bottom: 3rem; }
.item {
  width: 100%;
  padding-top: 100%;
  background-size: cover;
  border: 1px solid #e7ebf3;
}
  .item img {
    width: 100%;
  }
</style>