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
  data: function() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechartChoice',
            toolbar: { show: false }
          },
        },
        series: [{
            name: "TESTS",
            data: [],
        }],
      }
    },
  computed: {
    votes(this: any) {
        return this['$store'].getters.getVote(this.id);
    },
    question(this: any) {
        return this['$store'].getters.getQuestion(this.id);
    },
  },
  created: function(this: any) {
      this.filterVotesXaxis();
  },
  methods: {
   countInArray: function(array, id) {
       let counter = 0;
       array.forEach(element => {
           element.forEach(element2 => {
               if (element2.choice == id) {
                   counter ++;
               }
           });
       });
       return counter;
   },
   filterVotesXaxis(this: any) {
        let choices : any[] = [];
        this.question.choices.forEach(element => {
            choices.push({
                'x': element.id,
                'y': this.countInArray(this.votes, element.id)
            });
        });
        this['$data'].series = [{
            data: choices
        }];
    },
  },
  mounted(this: any) {
    this['$root'].$on('next', (data) => {
      if (data === 'LIKE' && this.liked !== '') {
        this['$store'].dispatch('createAnswerLike', { question: this.id, likeID: this.liked});
      }
    });
  },
};
</script>

<style scoped="true" lang="scss">
</style>