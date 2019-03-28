<template>
  <b-row class="items d-flex"
       v-if="question.items && question.items.length > 0">
    <b-col :class="(question.items.length===1) ? 'col-md-6' : ((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
         v-for="(item, i) in question.items"
         :key="`${item.id}`+i">
      <b-card 
          header-tag="header"
          class="w-100 shadow bg-white">
        <img v-if="item.image && item.image.url" slot="header" class="w-100 card-img-top" v-img :src="`${item.image.url}`">
        <b-card-text>{{item.label}}</b-card-text>
      </b-card>
    </b-col>
  </b-row>
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
.items { 
  margin-bottom: 1rem; 
  justify-content: center;
}
.card-body {
  padding: 0;
}
img {
    object-fit: cover;
    width: 100%;
    max-height: 40vh;
}
.card-header {
  padding: 0;
}
.card-text {
  line-height: 40px;
}
.col-md-6, .col-md-4 {
  margin: 0.5rem 0;
}

@media (min-width: 720px) {
img {
    object-fit: contain;
    }
}


</style>