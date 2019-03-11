<template>
  <div class="form-group">
    <div class="row">
      <div class="col-1">
        {{ question.min }}
      </div>
      <div class="col-10 range">
        <input type="range"
               class="custom-range"
               :min="question.min"
               :max="question.max"
               :step="question.stepSize"
               v-bind:value="value"
               @change="updateValue"/>
        <span v-if="value === null" class="value">{{ question.default }}</span>
        <span v-if="value !== null" class="value">{{ value }}</span>
      </div>
      <div class="col-1">
        {{ question.max }}
      </div>
    </div>
    <b-row>
      <b-col cols="6">
        <div class ="text-center">
          <input type="checkbox" @click="deselectAll()"/>
          <label>  Abstain from voting</label>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegulatorOption',
  data() {
    return {
      value: null,
      answered: false,
    };
  },
  props: {
    id: String,
  },
  created(this: any) {
    this.value = this.question.default;
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    deselectAll(this: any) {
      this.value = null;
    },
    updateValue(this: any, event) {
      this.value = event.target.value;
    },
    sendAnswer(this: any) {
      const rating = (this.value != null) ? parseFloat(this.value) : null;
      this.$store.dispatch('createAnswerRegulator', { question: this.id, ratingID: rating });
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
  .range { 
    text-align: center; 
    font-size: 1rem;
    padding: 0;
    }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    background: $primaryColor;
  }

</style>