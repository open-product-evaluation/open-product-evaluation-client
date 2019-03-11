<template>
<div>
<div class="drag">
  <draggable v-model="question.items"
             @start="drag = true"
             @end="drag = false"
             class="options row">
    <div :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'"
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
          <label> Abstain from voting</label>
        </div>
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
  beforeDestroy(this: any) {
    this.$eventBus.$off();
  },
  mounted(this: any) {
    this.$eventBus.$on('answer', (data) => {
      this.sendAnswer();
    });
  },
};
</script>

<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
  .rankingLabel {
    display: flex;
    justify-content: center;
    font-size: 2rem;
  }
  .card-header {
    padding: 0;
    max-width: 100%;
  }
</style>