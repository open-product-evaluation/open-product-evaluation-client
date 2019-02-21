<template>
<div>
<apexchart width="80%" type="bar" :options="chartOptions" :series="series"></apexchart>
</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'BarVotes',
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
      this.getVotesDiagramm();
  },
  methods: {
   countInArray: function(this: any, votes, id) {
       let counter = 0;
       votes.forEach(answer => {
           answer.forEach(element => {
               switch (this.question.type)
               {
                    case 'CHOICE': {
                        if (element.choice == id) {
                            counter ++;
                        }
                        break;
                    }
                    case 'FAVORITE': {
                        if (element.favoriteItem == id) {
                            counter ++;
                        }
                        break;
                    }
                }   
           });
       });
       return counter;
   },
   getVotesDiagramm(this: any) {
        let result : any[] = [];
        switch (this.question.type) {
            case 'CHOICE': {
                this.question.choices.forEach(element => {
                    result.push({
                        'x': element.id,
                        'y': this.countInArray(this.votes, element.id)
                    });
                });
                break;
            }
            case 'FAVORITE': {
                this.question.items.forEach(element => {
                    result.push({
                        'x': element.id,
                        'y': this.countInArray(this.votes, element.id)
                    });
                });
                break;
            }
        }
        this['$data'].series = [{
            data: result
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