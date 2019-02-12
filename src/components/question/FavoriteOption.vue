<template>
  <div class="options row">
  <div v-for="item in question.items" :key="item.id">
      <b-card :img-src="`${item.image.url}`"
        style="max-width: 40rem;"
        :class="{ selected: selected === item.id}">
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
      if (data === 'FAVORITE') {
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
</style>