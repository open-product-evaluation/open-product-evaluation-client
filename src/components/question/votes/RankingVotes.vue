<template>
<div>
<apexchart width="80%" type="bar" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ChoiceVotes',
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
                    if (element.choice === id) {
                        counter ++;
                        }
                    });
                });
            return counter;
        },
        getVotesDiagramm(this: any) {
            const result: any[] = [];
            this.question.choices.forEach( (element) => {
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
</style>