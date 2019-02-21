<template>
<div>
    <apexchart style="text-align: center; margin: auto;" width="50%" type="radialBar" :options="chartOptions" :series="series" :labels="labels"></apexchart>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'LikeVotes',
  components: {
      apexchart: VueApexCharts,
  },
  props: {
    id: String,
  },
  data: function() {
      return {
        series: [],
        chartOptions: {
          labels: ['Liked'],
        }
      }
    },
  computed: {
    votes(this: any) {
        return this['$store'].getters.getVote(this.id);
    },
  },
  created: function(this: any) {
      this.getVotesDiagramm();
  },
  methods: {
   countInArray: function(this: any, votes) {
       let counter = 0, max = 0;
       votes.forEach(answer => {
           answer.forEach(element => {
               max++;
                if (element.liked === true) {
                    counter ++;
                }
           });
       });
       return (counter/max)*100;
   },
   getVotesDiagramm(this: any) {
        let result : any[] = [];
        result = this.countInArray(this.votes);
        this['$data'].series = [ result ];
    },
  },
};
</script>

<style scoped="true" lang="scss">
</style>