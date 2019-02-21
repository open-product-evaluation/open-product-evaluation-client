<template>
<div>
    <apexchart width="80%" type="donut" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'LikeDislikeVotes',
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
          labels: ['Liked', 'Disliked', 'Neutral'],
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
       let counterLike = 0, counterDislike = 0, max = 0;
       votes.forEach(answer => {
           answer.forEach(element => {
               max++;
                if (element.liked === true) {
                    counterLike ++;
                }
                else if (element.liked === false) {
                    counterDislike ++;
                }
           });
       });
       let neutral = max - counterDislike - counterLike;
       return [ (counterLike/max)*100, (counterDislike/max)*100, (neutral/max)*100 ];
   },
   getVotesDiagramm(this: any) {
        this['$data'].series = this.countInArray(this.votes);
    },
  },
};
</script>

<style scoped="true" lang="scss">
</style>