<template>
<div class="drag">
  <draggable v-model="question.items"
             @start="drag = true"
             @end="drag = false"
             class="options row">
      <div class="col-6 col-sm-4"
          v-for="(item, index) in question.items"
          :key="item.id">
        <div class="image"
            :style="{backgroundImage: `url(${item.image.url})`}">
        </div>
         <span class="label" 
         v-if="item.image && item.image.url">
        {{ item.label }}
        </span>
        <span class="rankingLabel">Platz {{ index + 1}}</span>
      </div>
  </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable';

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
      return this['$store'].getters.getQuestion(this.id);
    },
  },
  methods: {
    getAnswers(this: any): string[] {
      // Build array for rankingItems
      // [1,...,n] -> n is best
      let favoriteArray: string[] = [];
      this.question.items.forEach( (element) => {
        favoriteArray.push(element.id);
      });
      return favoriteArray;
    },
  },
  mounted(this: any){
    this['$root'].$on('next', data => {
      if (data=="RANKING"){
        this['$store'].dispatch('createAnswerRanking', { question: this.id, rankingID: this.getAnswers() });
      }
    });
  },
};
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
  .rankingLabel {
    display: flex;
    justify-content: center;
    font-size: 2rem;
    color: $primaryColor;
  }
</style>