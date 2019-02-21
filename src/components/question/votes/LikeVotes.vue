<template>
<div>
    <apexchart width="60%" type="donut" :options="chartOptions" :series="series" :labels="labels"></apexchart>
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
          labels: ['Liked', 'Neutral'],
          dataLabels: {
            formatter: function (val) {
                return Math.round(val) +  '%';
            },
            style: {
                fontSize: '1.25rem',
            },
          },
          legend: {
              position: 'top',
              fontSize: '20px',
          }
        }
      }
    },
  computed: {
    votes(this: any) {
        return this.$store.getters.getVote(this.id);
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
       return [(counter/max)*100, ((max-counter)/max)*100];
   },
   getVotesDiagramm(this: any) {
        this.$data.series = this.countInArray(this.votes);
    },
  },
};
</script>

<style scoped="true" lang="scss">
</style>