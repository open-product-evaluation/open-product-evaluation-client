<template>
<p>Hier kommt das Diagramm {{ this.votes }}</p>
  
</template>

<script lang="ts">
export default {
  name: 'ChoiceVotes',
  props: {
    id: String,
  },
  computed: {
    votes(this: any) {
        console.log(this['$store'].getters.getVotes(this.id));
        return this['$store'].getters.getVotes(this.id);
    },
  },
  methods: {
  },
  mounted(this: any) {
    this['$root'].$on('next', (data) => {
      if (data === 'LIKE' && this.liked !== '') {
        this['$store'].dispatch('createAnswerLike', { question: this.id, likeID: this.liked});
      }
    });
  },
};
</script>

<style scoped="true" lang="scss">

</style>