<template>
  <draggable v-model="question.items"
             @start="drag = true"
             @end="drag = false"
             class="options row">
    <div class="col-6 col-sm-4"
         v-for="(item, index) in question.items"
         :key="item.id">

      <div class="image"
           :style="{backgroundImage: `url(${item.image.url})`}">
        <span class="rank">{{ index + 1}}</span>
      </div>
    </div>
  </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
export default {
  name: 'RankingOption',
  components: {
    draggable,
  },
  props: {
    id: String,
  },
  computed: {
    question(this: any) {
      return JSON.parse(JSON.stringify(this['$store'].getters.getQuestion(this.id)))
    },
  },
}
</script>

<style scoped="true" lang="scss">
@import "../../scss/variables"; 
  .image {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
  }
  .rank {
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 2rem;
    color: $primaryColor;
  }
</style>