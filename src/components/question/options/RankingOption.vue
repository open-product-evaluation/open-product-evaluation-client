<template>
<div>
<div class="drag">
  <draggable v-model="question.items"
             @start="drag = true"
             @end="drag = false"
             class="options row"
             :onchange="selected = true">
    <div :class="((question.items.length%2)===0) ? 'col-lg-6' : 'col-lg-4'"
          v-for="(item, index) in question.items" 
          :key="item.id">
      <b-card :title="`Platz ${index + 1}`"
          :sub-title="`${item.label}`">
          <b-card-header>
            <img style="max-width: 100%;"  v-if="item.image && item.image.url" v-img :src="`${item.image.url}`">
          </b-card-header>
      </b-card>
    </div>
  </draggable>
</div>
    <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" @click="deselectAll()"/>
          <label>keine Angabe</label>
        </div>
      </b-col>
      <b-col cols="6" class="text-center" v-if="!answered">
        <b-button variant="primary" @click="sendAnswer()">ANTWORTEN</b-button>
      </b-col>
    </b-row>
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
  data() {
    return {
      selected: true,
      answered: false,
    };
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    deselectAll(this: any) {
      this.selected = null;
    },
    getAnswers(this: any) {
      if (this.selected === null ) {
        return null;
      } else {
        // Build array for rankingItems
        // [1,...,n] -> n is best
        const favoriteArray: string[] = [];
        this.question.items.forEach( (element) => {
          favoriteArray.push(element.id);
        });
        return favoriteArray;
      }

    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerRanking', { question: this.id, rankingID: this.getAnswers() });
      this.answered = true;
      this.$root.$emit('answered');
    },
  },
};
</script>

<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
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
  .card-header {
    padding: 0;
    max-width: 100%;
  }
</style>