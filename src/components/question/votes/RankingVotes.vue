<template>
<div class="chartDiagramm">
<apexchart type="heatmap" :options="chartOptions" :series="series"></apexchart>
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
        chartOptions: {
          chart: {
            id: 'vuechartChoice',
            toolbar: { show: false },
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
        countInArray(this: any, id, index) {
            let counter = 0;
            this.votes.forEach( (vote) => {
                if (vote[0].rankedItems != null) {
                    if (vote[0].rankedItems[index] === id) {
                        counter++;
                    }
                }
            });
            this.answers.forEach(answer => {
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
                    x: 'Platz: ' + (i + 1),
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
            this.$data.series = series;
        },
    },
};
</script>

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 50%;
}
</style>