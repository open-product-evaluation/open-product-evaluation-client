<template>
  <div class="options row">
    <div class="col-6 col-sm-4"
         v-for="item in question.items"
         :key="item.id">
      <a class="item"
         @click="select($event, item.id)"
         href="#"
         :class="{ selected: selected === item.id}">
        <div class="image"
             :style="{backgroundImage: `url(${item.image.url})`}">
          <!-- <font-awesome-icon icon="star" /> -->
        </div>
      </a>
      <p> {{item.label}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoriteOption',
  props: {
    id: String,
  },
  data() {
    return {
      selected: '',
    }
  },
  computed: {
    question() {
      return JSON.parse(JSON.stringify(this.$store.getters.getQuestion(this.id)))
    },
  },
  methods: {
    select(event, id) {
      event.preventDefault()
      this.selected = id
    },
  },
}
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