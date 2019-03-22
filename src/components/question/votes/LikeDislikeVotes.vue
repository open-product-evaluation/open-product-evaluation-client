<template>
<div class="chartDiagramm">
    <h5 v-if="votes.length === 0"> No votes submitted. </h5>
    <span v-if="votes.length > 0">
         <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
    </span>
    </div>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';
import BaseVotes from './BaseVotes.vue';

export default {
  name: 'LikeDislikeVotes',
  extends: BaseVotes,
  data() {
      return {
        series: [],
        chartOptions: {
            labels: ['Like', 'Dislike', 'Abstention'],
            theme: {
              palette: 'palette4',
            },
            dataLabels: {
                formatter(val) {
                    return Math.round(val) +  ' %';
                },
                style: {
                    fontSize: '1rem',
                },
            },
            legend: {
                position: 'top',
            },
        },
      };
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
       this.answers.forEach( (element) => {
            max++;
            if (element.liked === true) {
                counterLike ++;
                } else if (element.liked === false) {
                    counterDislike ++;
                }
        });

       const neutral = max - counterDislike - counterLike;
       return [ (counterLike / max) * 100, (counterDislike / max) * 100, (neutral / max) * 100 ];
   },
   getVotesDiagramm(this: any) {
       if (this.votes.length > 0) {
            this.$data.series = this.countInArray(this.votes);
        }
    },
  },
};
</script>

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 30%;
}
@media (max-width: 576px) {
.chartDiagramm {
    width: 80%;
}
}
</style>