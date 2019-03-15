<template>
<div>
  <b-row class="px-3">
  <div v-for="item in question.items" :key="item.id" :class="((question.items.length%2)===0) ? 'col-md-6' : 'col-md-4'" class="p-2">
      <b-card no-body :class="{ selected: selected === item.id}"
          header-tag="header"
          class="h-100 shadow bg-white">
        <img v-if="item.image && item.image.url" slot="header" class="w-100 h-100 images" v-img :src="`${item.image.url}`">
        <b-card-body class="p-2">
        <b-button class="primaryBtn" @click="select($event, item.id)"> {{ item.label }}</b-button>
        </b-card-body>
      </b-card>
    </div>
    </b-row>
  <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" :checked="selected==null" @click="deselectAll()"/>
          <label> abstain from voting</label>
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
      selected: null,
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
      this.selected = null;
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
  .images {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
  .selected {
    border: 3px solid $primaryColor;
  }
  .card-header {
    padding: 0;
    max-height: 35vh;
  }
  @media (min-width: 960px) {
.images {
    object-fit: contain;
    }
}
</style>