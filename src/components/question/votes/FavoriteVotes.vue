<template>
<div class="chartDiagramm">
<apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'FavoriteVotes',
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
          theme: {
              palette: 'palette4',
          },
          dataLabels: {
            style: {
                fontSize: '1.25rem',
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
          tooltip: {
                y: {
                    title: {
                        formatter() {
                            return '';
                        },
                    },
                },
            },
        },
        series: [{
            data: [],
        }],
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
        countInArray(this: any, votes, id) {
            let counter = 0;
            votes.forEach( (answer) => {
                answer.forEach( (element) => {
                    if (element.favoriteItem === id) {
                        counter ++;
                    }
                });
            });
            return counter;
        },
        getVotesDiagramm(this: any) {
            const result: any[] = [];
            this.question.items.forEach( (element) => {
                result.push({
                    x: element.label,
                    y: this.countInArray(this.votes, element.id),
                });
            });
            this.$data.series = [{
                data: result,
            }];
        },
    },
};
</script>

<style scoped="true" lang="scss">
.chartDiagramm {
    margin: 0 auto; 
    width: 60%;
}
</style>