<template>
  <ol class="choices">
    <li class="choice"
        v-for="choice in question.choices"
        :class="{'no-image': !choice.image }"
        :key="choice.id">
      <input type="radio"
             :id="`choice-${choice.id}`"
             :name="`choice-${question.id}`"
             v-if="choice.image && choice.image.url"
             :value="choice.label" />
      <label :for="`choice-${choice.id}`"
             v-if="!choice.image">
       <input type="radio"
              :id="`choice-${choice.id}`"
              :name="`choice-${question.id}`"
              :value="choice.label" />
        {{ choice.label}}
      </label>
      <label class="icon"
             :for="`choice-${choice.id}`"
             v-if="choice.image && choice.image.url"
             :style="{backgroundImage: `url(${choice.image.url})`}">

      </label>
      <span class="label"
            v-if="choice.image && choice.image.url">
        {{ choice.label }}
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'ChoiceOption',
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
@import "../../scss/variables"; 
  .choices {
    padding: 0;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-bottom: 2rem;
  }
  input[type="radio"]:checked + label + span { color: $primaryColor; }
  .choice {
    text-align: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.no-image {
      flex-direction: row;
      label { margin-bottom: 0;}
      input { display: inline; margin-right: 5px; }
    }
    input { display: none;}
    .icon {
      display: block;
      cursor: pointer;
      width: 2.5rem;
      margin-bottom: 0.5rem;
      background-size: contain;
      margin: 0 auto 0.5rem;
      height: 2.5rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>