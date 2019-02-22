<template>
<div>
  <div style="display: inline-flex;">
  <div v-for="item in question.items" :key="item.id" :class="((question.items.length%2)===0) ? 'col-lg-6' : 'col-lg-4'">
      <b-card :class="{ selected: selected === item.id}">
        <b-card-header>
           <img v-if="item.image && item.image.url" style="max-width: 100%;" v-img :src="`${item.image.url}`">
        </b-card-header>
        <b-button variant="primary" @click="select($event, item.id)"> {{ item.label }}</b-button>
      </b-card>
    </div>
  </div>
  <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox"/>
          <label>enthalten</label>
        </div>
      </b-col>
      <b-col cols="6" class="text-center" v-if="!answered">
        <b-button variant="primary" @click="sendAnswer()">ANTWORTEN</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FavoriteOption',
  props: {
    id: String,
  },
  data() {
    return {
      selected: '',
      answered: false,
    };
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    select(this: any, event, id) {
      event.preventDefault();
      this.selected = id;
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerFavorite', { question: this.id, favoriteID: this.selected});
      this.answered = true;
      this.$root.$emit('answered');
    },
  },
};
</script>


<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
  .item {
    display: block;
    border: 3px solid #FFFFFF;
  }
  .image {
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    .oi {
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      font-size: 2rem;
      color: $primaryColor;
    }
  }
  .selected {
    border: 3px solid $primaryColor;
    .oi {
      display: block;
    }
  }
  .card-header {
    padding: 0;
  }
</style>