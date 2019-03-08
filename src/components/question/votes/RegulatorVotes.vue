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

export default {
  name: 'RegulatorVotes',
  components: {
      apexchart: VueApexCharts,
  },
  props: {
    id: String,
  },
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
    computed: {
        votes(this: any) {
            return this.$store.getters.getVote(this.id);
        },
        question(this: any) {
            return this.$store.getters.getQuestion(this.id);
        },
    },
    created(this: any) {
        this.getVotesDiagramm();
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
            const votes = this.valuesOfVotes();
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

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 60%;
}
@media (min-width: 576px) {
.chartDiagramm {
    width: 80%;
}
}
</style>