<template>
  <div class="surveycards">
    <h2>SurveyListe</h2>
    <p>
      OPE - und alles ist okay!
    </p>
    <div v-for="survey in surveys" :key="survey.id">
      <b-card :title="`${survey.activeSurvey.title}`"
        img-src=""
        style="max-width: 40rem;"
        class="mb-2">
        <p class="card-text"> {{survey.activeSurvey.description}}</p>
        <b-button @click="startSurvey(survey.id)">Starten</b-button>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
  name: 'SurveyEdit',
  created(this: any) {
      this['$store'].dispatch('getSurveys').then((result) => {
        this.surveys;
      },
      (error) => {
        // console.log(error.message);
        // Authorization failed
      });
  },
  computed: {
    surveys() {
      return this['$store'].getters.getSurveys;
    },
  },
  methods: {
    // Update Client
    startSurvey(domainID) {
      const client = this['$store'].getters.getClient;
      this['$store'].dispatch('updateClient', {
        id: client.client.id,
        domainId: domainID,
      });
      this['$router'].push({name: 'question', params: {cID: domainID}});
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
