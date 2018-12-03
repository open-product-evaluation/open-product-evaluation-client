<template>
  <div class="hello">
    <h1>Open Product Evaluation</h1>
    <h2>SurveyListe</h2>
    <p>
      OPE - und alles ist okay!
    </p>
    <button @click="updateContext()">Context hinzufügen</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const store = '$store';

export default {
  name: 'SurveyEdit',
  created() {
    this[store].dispatch('createDevice', { name: 'hi'});
  },
  methods: {
    updateContext() {
      
      
      //Update Device 
      // TODO exchange contextID
      const device = this[store].getters.getDevice;
      this[store].dispatch('updateDevice', {
        id: device.device.id,
        contextId: '7df600774ceaa14488143c9d7877fd71662f4750c7c1c77aede7aa684d7c16f1',
      });

      //Get Specific Device
      // TODO exchange context
      this[store].dispatch('getSurvey', {
        context: '7df600774ceaa14488143c9d7877fd71662f4750c7c1c77aede7aa684d7c16f1',
        });
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
