<template>
<div class="chartDiagramm">
<h5 v-if="votes.length === 0 && answers.length === 0"> No votes submitted. </h5>
<span v-if="votes.length > 0 || answers.length > 0">
    <h5> Number of abstentions: {{neutral}}</h5>
    <apexchart type="heatmap" :options="chartOptions" :series="series"></apexchart>
</span>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';
import BaseVotes from './BaseVotes.vue';

export default {
  name: 'RankingVotes',
  extends: BaseVotes,
  data() {
      return {
        neutral: 0,
        chartOptions: {
          chart: {
            id: 'vuechartChoice',
            toolbar: { show: false },
          },
          theme: {
              palette: 'palette4',
          },
          dataLabels: {
            style: {
                fontSize: '1.25rem',
            },
          },
        },
        series: [],
      };
    },
    methods: {
        countNeutral(this: any) {
            let counterNeutral = 0;
            this.votes.forEach( (vote) => {
                if (vote[0].rankedItems == null) {
                    counterNeutral++;
                }
            });
            return counterNeutral;
        },
        countInArray(this: any, id, index) {
            let counter = 0;
            this.votes.forEach( (vote) => {
                if (vote[0].rankedItems != null) {
                    if (vote[0].rankedItems[index] === id) {
                        counter++;
                    }
                }
            });
            this.answers.forEach( (answer) => {
                if (answer.rankedItems != null) {
                    if (answer.rankedItems[index] === id) {
                        counter++;
                    }
                }
            });
            return counter;
        },
        getElement(this: any, id) {
            const result: any[] = [];
            for (let i = 0; i < this.question.items.length; i++) {
                result.push({
                    x: 'Position #' + (i + 1),
                    y: this.countInArray(id, i),
                });
            }
            return result;
        },
        getVotesDiagramm(this: any) {
            const series: any[] = [];
            this.question.items.forEach( (element) => {
                // [1, ... n] n is best
                series.push({
                    name: element.label,
                    data: this.getElement(element.id),
                });
            });
            this.series = series;
            this.neutral = this.countNeutral();
        },
    },
};
</script>

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 80%;
}
@media (max-width: 576px) {
.chartDiagramm {
    width: 100%;
}
}
</style>