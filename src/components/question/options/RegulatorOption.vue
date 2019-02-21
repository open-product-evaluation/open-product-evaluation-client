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
               @change="updateValue" />
        <span v-if="value === null" class="value">{{ question.default }}</span>
        <span v-if="value !== null" class="value">{{ value }}</span>
      </div>
      <div class="col-1">
        {{ question.max }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegulatorOption',
  data() {
    return {
      value: null,
    };
  },
  props: {
    id: String,
  },
  computed: {
    question(this: any) {
      return this.$store.getters.getQuestion(this.id);
    },
  },
  methods: {
    updateValue(this: any, event) {
      this.value = event.target.value;
    },
  },
  mounted(this: any) {
    this.$root.$on('next', (data) => {
      if (data === 'REGULATOR' && this.value != null) {
        const rating = (this.value != null) ? parseFloat(this.value) : 0;
        this.$store.dispatch('createAnswerRegulator', { question: this.id, ratingID: rating });
      }
    });
  },
};
</script>


<style scoped="true" lang="scss">
  .range { 
    text-align: center; 
    font-size: 1.5rem;
    padding: 0;
    }
  .col-1 {
    font-size: 1.5rem;
  }
</style>