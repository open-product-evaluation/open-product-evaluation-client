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

export default {
  name: 'SurveyEdit',
  created() {
    this['$store'].dispatch('createClient', { name: 'hi'}).then((result) =>
      this['$store'].dispatch('getSurveys')
    )
  },
  computed: {
    surveys() {
      return this['$store'].getters.getSurveys;
    },
  },
  methods: {
    //Update Client 
    startSurvey(domainID) {
      const client = this['$store'].getters.getClient;
      this['$store'].dispatch('updateClient', {
        id: client.client.id,
        domainId: domainID,
      });
      this['$router'].push({name:'question', params:{cID:domainID}});
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
