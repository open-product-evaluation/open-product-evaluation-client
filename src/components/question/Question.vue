<template>
    <div class="container">
      <b-card>
        <div slot="header">
          <h2 >{{ survey.title }}</h2>
          
          <p class="description">
            {{ survey.description }}
          </p>
        </div>
        <b-row no-gutters>
          <b-col md="1"/>
          <b-col md="10">
          <!-- TODO Choose progressBar oder ProgressSteps --> 
          <div class="stepper">
              <step-indicator :current="index" :total="survey.questions.length"></step-indicator>
          </div>

          <div class="question" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0">

            <!-- display question title and description -->
            <questionMeta :id="survey.questions[index].id"></questionMeta>

            <!-- display question items -->
            <questionItems :id="survey.questions[index].id"
                  v-if="displayItems(survey.questions[index].type)">
            </questionItems>

            <!-- display choices -->
            <choice :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'CHOICE'">
            </choice>

            <!-- display like / dislike options -->
            <likeDislike :id="survey.questions[index].id"
                        v-if="survey.questions[index].type === 'LIKEDISLIKE'">
            </likeDislike>

            <!-- display like option -->
            <like :id="survey.questions[index].id"
                  v-if="survey.questions[index].type === 'LIKE'">
            </like>

            <!-- display regulator option -->
            <regulator :id="survey.questions[index].id"
                      v-if="survey.questions[index].type === 'REGULATOR'">
            </regulator>

            <!-- display special ranking options -->
            <ranking :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'RANKING'">
            </ranking>

            <!-- display special favorite options -->
            <favorite :id="survey.questions[index].id"
                      v-if="survey.questions[index].type === 'FAVORITE'">
            </favorite>
          </div>
          <b-row>
            <b-col cols="6" class="text-center">
              <b-btn variant="primary">
                enthalten
              </b-btn>
            </b-col>
            <b-col cols="6" class="text-center">
              <b-btn variant="primary">
                senden
              </b-btn>
            </b-col>


          </b-row>

          <!-- <b-row v-if="survey.questions
                     && survey.questions.length
                     && survey.questions.length > 0">
          <b-col cols="6" class="text-left">
            <b-btn variant="primary"
                   @click="previous"
                   v-if="index !== 0">
              Previous
            </b-btn>
          </b-col>
          <b-col cols="6" class="text-right">
            <b-btn variant="primary"
                   @click="next"
                   v-if="index !== survey.questions.length - 1">
              Next
            </b-btn>
            <b-btn variant="primary"
                   @click="next"
                   v-if="index == survey.questions.length -1 ">
              Beenden
            </b-btn>
          </b-col>
        </b-row> -->
          </b-col>
          <b-col md="1">
            <b-button @click="next"
                   v-if="index !== survey.questions.length - 1">--></b-button>
          </b-col>
        </b-row>

        <!-- In den Footer?-->
        <div class="votes" slot="footer" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0">
                                      <p>{{survey.questions[index].type}} </p>
          <!-- display  Votes -->
            <choiceVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'CHOICE'">
            </choiceVotes>
            <favoriteVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type ==='FAVORITE'">
            </favoriteVotes>
             <likeVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'LIKE'">
            </likeVotes>
            <likeDislikeVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'LIKEDISLIKE'">
            </likeDislikeVotes>
             <regulatorVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'REGULATOR'">
            </regulatorVotes>
        </div>

      </b-card>
      <b-progress :max="max">
        <b-progress-bar :value="counter" show-progress :label="`${counter}%`">
        </b-progress-bar>
      </b-progress>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QuestionItem from '@/components/question/QuestionItem.vue';
import ChoiceOptions from '@/components/question/options/ChoiceOption.vue';
import RankingOptions from '@/components/question/options/RankingOption.vue';
import FavoriteOptions from '@/components/question/options/FavoriteOption.vue';
import RegulatorOptions from '@/components/question/options/RegulatorOption.vue';
import LikeOptions from '@/components/question/options/LikeOption.vue';
import LikeDislikeOptions from '@/components/question/options/LikeDislikeOption.vue';
import QuestionValue from '@/components/question/QuestionValue.vue';
import ChoiceVotes from '@/components/question/votes/ChoiceVotes.vue';
import FavoriteVotes from '@/components/question/votes/FavoriteVotes.vue';
import LikeVotes from '@/components/question/votes/LikeVotes.vue';
import LikeDislikeVotes from '@/components/question/votes/LikeDislikeVotes.vue';
import RegulatorVotes from '@/components/question/votes/RegulatorVotes.vue';
import StepIndicator from 'vue-step-indicator';

export default {
  name: 'Question',
  components: {
    questionItems: QuestionItem,
    choice: ChoiceOptions,
    ranking: RankingOptions,
    favorite: FavoriteOptions,
    regulator: RegulatorOptions,
    like: LikeOptions,
    likeDislike: LikeDislikeOptions,
    questionMeta: QuestionValue,
    StepIndicator,
    choiceVotes: ChoiceVotes,
    favoriteVotes: FavoriteVotes,
    likeVotes: LikeVotes,
    likeDislikeVotes: LikeDislikeVotes,
    regulatorVotes: RegulatorVotes,
  },
  data() {
    return {
      index: 0,
      max: 100,
      counter: 0,
    };
  },
  created(this: any) {
    // const domainID = this['$route'].params.cID;
    /* TODO Change route.params.cID */
    const domainID = this._routerRoot._route.params.cID;
    this.$store.dispatch('getSurvey', {
        domain: domainID,
      });
  },
  computed: {
    survey(this: any) {
      return this.$store.getters.getSurvey;
    },
  },
  methods: {
    displayItems(type) {
      return !(type === 'RANKING' || type === 'FAVORITE');
    },
    next(this: any) {
      (this.index < this.survey.questions.length - 1) ? (this.index++) : this.$router.push({name: 'surveyList'});
      this.$root.$emit('next', this.survey.questions[this.index - 1].type);
      this.counter = Math.floor(this.index / this.survey.questions.length * 100);
    },
    previous(this: any) {
      if (this.index > 0) {
        this.index -= 1;
      }
    },
  },
};
</script>
<style src="vue-step-indicator/dist/vue-step-indicator.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.description {
  font-size: 1.25rem;
}
.progress {
  font-size: 1rem;
  height: max-content;
}
.progress-bar {
  height: 1.5rem;
}
.stepper {
  margin-bottom: 1rem;
}
</style>
