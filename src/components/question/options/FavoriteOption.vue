<template>
<div>
  <div style="display: inline-flex;">
  <div v-for="item in question.items" :key="item.id" :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'">
      <b-card no-body :class="{ selected: selected === item.id}"
          header-tag="header">
        <img v-if="item.image && item.image.url" slot="header" style="max-width:100%" v-img :src="`${item.image.url}`">
        <b-card-footer>
        <b-button class="primaryBtn" @click="select($event, item.id)"> {{ item.label }}</b-button>
        </b-card-footer>
      </b-card>
    </div>
  </div>
  <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" :checked="selected==''" @click="deselectAll()"/>
          <label>keine Angabe</label>
        </div>
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
    deselectAll(this: any) {
      this.selected = '';
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerFavorite', { question: this.id, favoriteID: this.selected});
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
  }
  .card-header {
    padding: 0;
  }
  .card, .card-footer {
    height: 100%;
  }
</style>