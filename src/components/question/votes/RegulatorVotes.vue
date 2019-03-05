<template>
<div class ="chart">
    <h5> Durchschnitt: {{ avg }}</h5>
    <div class="chartDiagramm" >
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
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
                  text: 'Anzahl',
              },
          },
          xaxis: {
              title: {
                  text: 'Wert',
              },
          },
          tooltip: {
                y: {
                    title: {
                        formatter(val) {
                            return 'Anzahl';
                        },
                    },
                },
            },
        },
         series: [{
            data: [],
        }],
        avg: 0,
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
            this.$data.series = [{
                data: result,
            }];
            this.avg = ((votes.reduce((sum, a) => sum + a)) / votes.length).toFixed(2);
            this.$data.chartOptions.xaxis.tickAmount = result.length - 1;
        },
    },
};
</script>