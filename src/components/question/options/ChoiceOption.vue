<template>
<div>
  <b-row>
    <b-col class="choice" v-for="choice in question.choices"
        :class="{'no-image': !choice.image }"
        :key="choice.id">
        <input type="radio"
              :id="`choice-${choice.id}`"
              :name="`choice-${question.id}`"
              v-if="choice.image && choice.image.url"
              :value="choice.label"
              :checked="choice.id == selected"
              @click="updateValue(choice.id)"
             />
      <label :for="`choice-${choice.id}`"
             v-if="!choice.image">
       <input type="radio"
              :id="`choice-${choice.id}`"
              :name="`choice-${question.id}`"
              :value="choice.id"
              :checked="choice.id == selected"
              v-if="!choice.image"
              @click="updateValue(choice.id)"
              />
        {{ choice.label}}
      </label>
      <label class="icon"
             :for="`choice-${choice.id}`"
             v-if="choice.image && choice.image.url"
             :checked="choice.id == selected"
             :style="{backgroundImage: `url(${choice.image.url})`}"
             @click="updateValue(choice.id)">
      </label>
      <span class="label"
            v-if="choice.image && choice.image.url">
        {{ choice.label }}
      </span>
    </b-col>
  </b-row>

  <b-row>
    <b-col cols="6">
      <div class ="neutral text-center">
        <input type="checkbox" @click="deselectAll()" :checked="!selected"/>
        <label>keine Angabe</label>
      </div>
    </b-col>
  </b-row>
  <b-row>
  </b-row>
</div>
</template>

<script lang="ts">

export default {
  name: 'ChoiceOption',
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
    updateValue(this: any, selectedItem) {
      this.selected = selectedItem;
    },
    deselectAll(this: any) {
      this.selected = null;
    },
    sendAnswer(this: any) {
      this.$store.dispatch('createAnswerChoice', { question: this.id, choiceID: this.selected});
      this.answered = true;
      this.$root.$emit('answered');
    },
  },
  beforeDestroy(this: any) {
    this.$eventBus.$off('answer');
  },
  mounted(this: any) {
    this.$eventBus.$on('answer', () => {
      this.sendAnswer();
    });
  },
};
</script>

<style scoped="true" lang="scss">
@import "../../../scss/variables"; 
  .choices {
    padding: 0;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-bottom: 2rem;
  }
  input[type="radio"]:hover + label + span { color: $primaryColor; }
  input[type="radio"]:checked + label + span { color: $primaryColor; }
  .choice {
    font-size: 1rem;
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
  .neutral {
    font-size: 1rem;
  }
</style>