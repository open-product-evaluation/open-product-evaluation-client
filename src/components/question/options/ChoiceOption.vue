<template>
<div>
  <b-row>
    <b-col class="choice radio" align-self="end" v-for="choice in question.choices"
        :class="{'no-image': !choice.image }"
        :key="choice.id">

        <!-- Choices with custom images-->
        <div v-if="choice.image && choice.image.url">
        <input type="radio"
              :id="`choice-${choice.id}`"
              :name="`choice-${question.id}`"
              :value="choice.label"
              :checked="choice.id == selected"
              @click="updateValue(choice.id)"
             />
          <label class="icon d-flex "
             :for="`choice-${choice.id}`"
             :checked="choice.id == selected"
             :style="{backgroundImage: `url(${choice.image.url})`}"
             @click="updateValue(choice.id)">
          </label>
          <span class="label">
            {{ choice.label }}
           </span>
        </div>

        <div v-if="!choice.image" class="radio">
          <input type="radio"
                    :id="`choice-${choice.id}`"
                    :name="`choice-${question.id}`"
                    :value="choice.id"
                    :checked="choice.id == selected"
                    @click="updateValue(choice.id)"
                    />
            <label :for="`choice-${choice.id}`">
              {{ choice.label}}
            </label>
            </div>
    </b-col>
  </b-row>

  <b-row class="mx-2 neutral" align-h="end">
          <input type="checkbox" :checked="selected==null" @click="deselectAll()"/>
          <label> abstain from voting</label>
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
    // send event to root, next question can be presented
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
@media (min-width: 720px) {
  .choice {
    text-align: center;
  }
}
@media (min-width:577px) and (max-width: 720px) {
 .col { flex: 1 0 50%; }
 .choice {
    text-align: left;
  }
}

@media (max-width: 576px) {
 .col { flex: 1 0 100%; }
 .choice {
    text-align: left;
  }
}
  .choices {
    padding: 0;
    display: flex;
    flex-direction: row;
    list-style: none;
    margin-bottom: 2rem;
  }
  input[type="radio"]:hover + label, 
  input[type="radio"]:checked + label,
  input[type="radio"]:hover + label + span,
  input[type="radio"]:checked + label + span { color: $primaryColor; }
  .choice {
    font-size: 1rem;
    flex-grow: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    &.no-image {
      label { margin-bottom: 0;}
      input { display: inline; margin:auto; }
    }
    input { display: none;}
    .icon {
      cursor: pointer;
      width: 4rem;
      background-size: contain;
      margin: 0;
      height: 4rem;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>