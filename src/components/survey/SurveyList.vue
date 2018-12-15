<template>
  <div class="surveycards">
    <h2>SurveyListe</h2>
    <p>
      OPE - und alles ist okay!
    </p>
    <ul >
      <li v-for="survey in surveys" :key="survey.id">
        {{ survey.activeSurvey.title }}
        <button @click="startSurvey(survey.id)">Starten</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const store = '$store';
const router = '$router';

export default {
  name: 'SurveyEdit',
  created() {
    this[store].dispatch('createDevice', { name: 'hi'});
    this[store].dispatch('getSurveys');
  },
  computed: {
    surveys() {
      return this[store].getters.getSurveys
    },
  },
  methods: {
    //Update Device 
    startSurvey(contextID) {
      const device = this[store].getters.getDevice;
      this[store].dispatch('updateDevice', {
        id: device.device.id,
        contextId: contextID,
      });
      this[router].push({name:'question', params:{cID:contextID}});
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
