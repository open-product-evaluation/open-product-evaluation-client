<template>
    <div class="container">
      <b-card no-body class="shadow bg-white rounded">
        <b-card-header>
          <h4>{{ survey.title }}</h4>
        </b-card-header>

        <b-card-body>
            <div class="progress" v-if="survey.questions && survey.questions.length > 20">
            <b-progress :max="100">
              <b-progress-bar :value="counter" show-progress :label="`${counter}%`">
              </b-progress-bar>
            </b-progress>
          </div>

        <b-row>
          <div class="stepper" v-if="survey.questions && survey.questions.length <= 20">
              <step-indicator current-color='#ffaa11' :current="index" :total="survey.questions.length"></step-indicator>
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
      </b-row>
      <b-row align-h="center" class="collab">
        <b-button class="primaryBtn" v-if="answered && survey.votes != null" v-b-toggle.votesCollab>
        <span class="when-opened">Schließe Ergebnis</span> <span class="when-closed">Öffne Ergebnis</span>
      </b-button>
      </b-row>
        <b-collapse id="votesCollab">
          <div class="votes" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0 
                                      && answered">
          <h5> Bisheriges Ergebnis </h5>
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
          <rankingVotes :id="survey.questions[index].id"
                    v-if="survey.questions[index].type === 'RANKING'">
          </rankingVotes>
        </div>
        </b-collapse>
      </b-card-body>
      <b-card-footer>
          <b-btn class="primaryBtn" @click="next"
                  v-if="answered && index !== survey.questions.length - 1">Weiter
          </b-btn>
          <b-btn class="primaryBtn" @click="next"
                  v-if="answered && index == survey.questions.length -1">Start
          </b-btn>
          <b-btn class="primaryBtn" v-if="!answered" @click="answer">Antworten</b-btn>
      </b-card-footer>
    </b-card>
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
import RankingVotes from '@/components/question/votes/RankingVotes.vue';
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
    rankingVotes: RankingVotes,
  },
  data() {
    return {
      index: 0,
      counter: 0,
      answered: false,
      counting: 0,
    };
  },
  created(this: any) {
    const domainID = this.$route.params.cID;
    this.$store.dispatch('getSurvey', {
        domain: domainID,
    }).then((data) => {
        this.$store.dispatch('getVotes', {
          surveyID: this.survey.id,
        });
      }, (error) => {
        console.log(error.message);
      });
  },
  computed: {
    survey(this: any) {
      return this.$store.getters.getSurvey;
    },
    votes(this: any) {
      return this.$store.getters.getVotes;
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
        this.answered = false;
    },
    answer(this: any) {
      this.$eventBus.$emit('answer');
    },
  },
  mounted(this: any) {
    this.$root.$on('answered', () => {
        this.answered = true;
    });
  },
};
</script>
<style src="vue-step-indicator/dist/vue-step-indicator.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../scss/variables.scss"; 
.question{
  width: 100%;
}
.container {
  margin: 3rem auto; 
}
.row {
  margin: 0;
}
.card-body {
  padding-bottom: 0;
}
.step-indicators.step-indicator{
  color: $primaryColor;
  border-color: $primaryColor;
}
.step-indicators-line{
  background: $secondaryBackgroundColor;
}
.progress {
  font-size: 1rem;
  height: max-content;
  width: 100%;
  border-radius: 0;
}
.progress-bar {
  height: 1.5rem;
  background: $secondaryBackgroundColor;
  opacity: 0.5;
  color: $primaryColor
}
.stepper {
  margin: 1rem 0;
  width: 100%;
}
.card-header h4 {
  margin-top: 0.5rem;
}
.btn_col {
  margin-top: auto;
}
.votes {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  padding-top: 1rem;
  margin-top: 1rem;
}
.collab {
  margin-bottom:1rem;
}
.next_btn input[type="button"]{
    display: none;
}
.icon {
  display: block;
  cursor: pointer;
  width: 2.5rem;
  margin-bottom: 0.5rem;
  background-size: contain;
  margin: 0 auto 0.5rem;
  height: 2.5rem;
  background-position: center;
  background-repeat: no-repeat;
}
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
