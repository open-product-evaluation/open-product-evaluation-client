<template>
  <div style="display: inline-flex;">
  <div v-for="item in question.items" :key="item.id" :class="((question.items.length%2)===0) ? 'col-lg-6' : 'col-lg-4'">
      <b-card
        :class="{ selected: selected === item.id}"
        header-tag="header">
        <img slot="header" style="max-width: 100%;" v-img :src="`${item.image.url}`">
        <b-button @click="select($event, item.id)"> {{ item.label }}</b-button>
      </b-card>
    </div>
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
    };
  },
  computed: {
    question(this: any) {
      return this['$store'].getters.getQuestion(this.id);
    },
  },
  methods: {
    select(this: any, event, id) {
      event.preventDefault();
      this.selected = id;
    },
  },
  mounted(this: any) {
    this['$root'].$on('next', (data) => {
      if (data === 'FAVORITE' && this.selected!='') {
        this['$store'].dispatch('createAnswerFavorite', { question: this.id, favoriteID: this.selected});
      };
    });
  },
};
</script>


<style scoped="true" lang="scss">
@import "../../scss/variables"; 
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