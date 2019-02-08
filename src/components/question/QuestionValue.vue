<template>
  <div class="meta">
    <h5>{{ question.value }}</h5>

    <p class="description">
      {{ question.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'QuestionValue',
  props: {
    id: String,
  },
  computed: {
    question() {
      return JSON.parse(JSON.stringify(this.$store.getters.getQuestion(this.id)))
    },
  },
}
</script>

<style scoped="true" lang="scss">
  .description { color: rgba(0, 0, 0, 0.5); margin-bottom: 2rem; }
</style>