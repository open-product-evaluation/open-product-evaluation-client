<template>
<div class ="chart">
    <h5 v-if="votes.length === 0"> No votes submitted. </h5>
    <span v-if="votes.length > 0">
        <h5> Average: {{ avg }} </h5>
        <h5> Number of abstentions: {{neutral}}</h5>
        <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    </span>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';
import { mapGetters } from 'vuex';
import BaseVotes from './BaseVotes.vue';

export default {
  name: 'RegulatorVotes',
  extends: BaseVotes,
  data() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechartChoice',
            toolbar: { show: false },
          },
          dataLabels: {
                offsetY: 10,
          },
          theme: {
              palette: 'palette4',
          },
          plotOptions: {
              bar: {
                  columnWidth: '70%',
                  dataLabels: {
                      position: 'bottom',
                  },
              },
          },
          grid: {
              xaxis: {
                  lines: {
                      show: true,
                  },
              },
          },
          yaxis: {
              axisBorder: {
                  show: true,
              },
              title: {
                  text: 'Number of votes',
              },
          },
          xaxis: {
              title: {
                  text: 'Values',
              },
          },
          tooltip: {
                y: {
                    title: {
                        formatter(val) {
                            return 'Number of votes';
                        },
                    },
                },
            },
        },
         series: [{
            data: [],
        }],
        avg: 0,
        neutral: 0,
      };
    },
    methods: {
        valuesOfVotes(this: any): number[] {
            const values: number[] = [];
            this.votes.forEach( (answer) => {
                answer.forEach( (element) => {
                    values.push(element.rating);
                });
            });
            return values;
        },
        getVotesDiagramm(this: any) {
            let votes = this.valuesOfVotes();
            if (votes.length > 0) {
                if (this.answers) {
                    votes = votes.concat(this.answers.map((answer: any) => answer.rating));
                }
                const result: any[] = [];
                let min = this.question.min;
                do {
                    const tmpVotes = votes;
                    result.push({
                        x: min.toString(),
                        y: tmpVotes.filter((v) => (v === min)).length,
                    });
                    min += this.question.stepSize;
                } while (min <= this.question.max);
                const nullVotes = votes;
                this.neutral = nullVotes.filter((v) => ( v === null)).length;
                this.series = [{
                    data: result,
                }];
                this.avg = ((votes.reduce((sum, a) => sum + a)) / votes.length).toFixed(2);
                this.chartOptions.xaxis.tickAmount = result.length - 1;
            }
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
