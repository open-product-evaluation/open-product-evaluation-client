<template>
  <div class="row items"
       v-if="question.items && question.items.length > 0">
    <div :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
         v-for="(item, i) in question.items"
         :key="`${item.id}`+i">
      <b-card
          header-tag="header">
        <img slot="header" style="max-width:100%" v-img :src="`${item.image.url}`">
        <b-card-footer> {{item.label}}</b-card-footer>
      </b-card>
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
      return this.$store.getters.getQuestion(this.id);
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
  .card-header, .card-body {
    padding: 0;
  }
  .card, .card-footer {
    height: 100%;
  }
  .card-footer {
    padding: 0.5rem 0.75rem;
  }
</style>