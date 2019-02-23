<template>
<div>
<apexchart width="80%" type="bar" :options="chartOptions" :series="series"></apexchart>
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
            style: {
                fontSize: '1.5rem',
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
                    if (element.rating === id) {
                        counter ++;
                        }
                    });
                });
            return counter;
        },
        getVotesDiagramm(this: any) {
            const result: any[] = [];
            let min = this.question.min;
            do {
                result.push({
                    x: min,
                    y: this.countInArray(this.votes, min),
                });
                min += this.question.stepSize;
            } while (min <= this.question.max);
            this.$data.series = [{
                data: result,
            }];
        },
    },
};
</script>

<style scoped="true" lang="scss">
</style>