<template>
    <div class="question">
      <b-card no-body class="shadow bg-white rounded">
        <b-card-header>
          <h4>{{ survey.title }}</h4>
        </b-card-header>

        <b-card-body class="py-0">
            <div class="progress w-100" v-if="survey.questions && survey.questions.length > 8">
            <b-progress :max="100">
              <b-progress-bar :value="counter" show-progress :label="`${counter}%`">
              </b-progress-bar>
            </b-progress>
          </div>

        <b-row class="m-0">
          <div class="w-100 my-3" v-if="survey.questions && survey.questions.length <= 8">
              <step-indicator current-color='#ffaa11' :current="index" :total="survey.questions.length"></step-indicator>
          </div>
          
          <div class="w-100" v-if="survey.questions
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
      <b-row align-h="center" class="m-0 mb-2" style="height: 40px">
        <b-button variant="primaryBtn" v-if="answered && survey.votes != null" v-b-toggle.votesCollab>
        <span class="when-opened">Hide votes</span> <span class="when-closed">Show votes</span>
      </b-button>
      </b-row>
        <b-collapse id="votesCollab">
          <div class="votes" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0 
                                      && answered">
          <h5>Previous votes</h5>
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
          <b-btn variant="primaryBtn" @click="next"
                  v-if="answered && index !== survey.questions.length - 1">Next
          </b-btn>
          <b-btn variant="primaryBtn" @click="next"
                  v-if="answered && index == survey.questions.length -1">Start
          </b-btn>
          <b-btn variant="primaryBtn" v-if="!answered" @click="answer">Answer</b-btn>
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
  @media (min-width: 540px) {
  .question {
    width: 80%;
    margin: 3rem auto;
    }
}
@media (max-width: 540px) {
  .question {
    width: 100%;
    margin: 0 auto;
    }
}
.question {
  object-fit: contain; 
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
  border-radius: 0;
}
.progress-bar {
  height: 1.5rem;
  background: $secondaryBackgroundColor;
  opacity: 0.5;
  color: $primaryColor
}
.card-header h4 {
  margin-top: 0.5rem;
}
.votes {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  padding-top: 1rem;
  margin-top: 1rem;
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
