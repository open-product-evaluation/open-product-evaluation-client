<template>
<div class="chartDiagramm">
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
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
  data() {
      return {
        series: [],
        chartOptions: {
            labels: ['Liked', 'Disliked', 'Neutral'],
            theme: {
              palette: 'palette4',
            },
            dataLabels: {
                formatter(val) {
                    return Math.round(val) +  ' %';
                },
                style: {
                    fontSize: '1.25rem',
                },
            },
            legend: {
                position: 'top',
            },
        },
      };
    },
  computed: {
    votes(this: any) {
        return this.$store.getters.getVote(this.id);
    },
  },
  created(this: any) {
      this.getVotesDiagramm();
  },
  methods: {
   countInArray(this: any, votes) {
       let counterLike = 0;
       let counterDislike = 0;
       let max = 0;
       votes.forEach( (answer) => {
           answer.forEach( (element) => {
               max++;
               if (element.liked === true) {
                   counterLike ++;
                } else if (element.liked === false) {
                    counterDislike ++;
                }
           });
       });
       const neutral = max - counterDislike - counterLike;
       return [ (counterLike / max) * 100, (counterDislike / max) * 100, (neutral / max) * 100 ];
   },
   getVotesDiagramm(this: any) {
        this.$data.series = this.countInArray(this.votes);
    },
  },
};
</script>

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 30%;
}
</style>