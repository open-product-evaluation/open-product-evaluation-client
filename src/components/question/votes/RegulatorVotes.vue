<template>
<div>
<apexchart width="80%" type="line" :options="chartOptions" :series="series"></apexchart>
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
  data: function() {
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
          yaxis: {
              min: 0,
              max: 1,
              tickAmount: 5,
          }
        },
        series: [{
            data: [],
        }],
      }
    },
  computed: {
    votes(this: any) {
        return this.$store.getters.getVote(this.id);
    },
    question(this: any) {
        return this.$store.getters.getQuestion(this.id);
    },
  },
  created: function(this: any) {
      this.getVotesDiagramm();
  },
  methods: {
   valuesOfVotes(this: any) : number[] {
       let values : number[] = [];
       this.votes.forEach(answer => {
           answer.forEach(element => {
                values.push(element.rating);
           });
       });
       return values;
   },
   getVotesDiagramm(this: any) {
        let votes = this.valuesOfVotes();
        this.$data.series = [{
            data: votes
        }]
        const avg = votes.reduce((sum, a) => sum + a);
        this.$data.chartOptions.yaxis.max = this.question.max;
        this.$data.chartOptions.yaxis.min = this.question.min;
        this.$data.chartOptions.yaxis.tickAmount = (this.question.max-this.question.min)/this.question.stepSize; 
        
        /* Show Average in LineChart*/
        this.$data.chartOptions.annotations = {
            yaxis: [{
                y: avg / votes.length,
                borderColor: '#00E396',
                label: {
                    style: {
                        color: 'red',
                    },
                    text: 'Average',
                },
            }],
        };
    },
  },
};
</script>

<style scoped="true" lang="scss">
</style>