<template>
    <div class="container">
      <b-card no-body>

        <b-card-body>
        <b-row>
          <b-col md="1"/>
          <b-col md="10">
          <!-- TODO Choose progressBar oder ProgressSteps --> 
          <div class="stepper">
              <step-indicator :current="activeQuestion" :total="survey.questions.length"></step-indicator>
          </div>

          <div class="question" v-if="answered"> 
            <h5>Bitte warten Sie auf die nächste Frage!</h5>
          </div>

          <div class="question" v-if="activeQuestion==-1"> 
            <h5>Die Umfrage hat noch nicht begonnen!</h5>
          </div>

          <div class="question" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0
                                      && !answered">

            <!-- display question title and description -->
            <questionMeta :id="survey.questions[activeQuestion].id" v-if="!isSlave"></questionMeta>

            <!-- display question items -->
            <questionItems :id="survey.questions[activeQuestion].id"
                  v-if="displayItems(survey.questions[activeQuestion].type)">
            </questionItems>

            <!-- display choices -->
            <choice :id="survey.questions[activeQuestion].id"
                    v-if="survey.questions[activeQuestion].type === 'CHOICE'">
            </choice>

            <!-- display like / dislike options -->
            <likeDislike :id="survey.questions[activeQuestion].id"
                        v-if="survey.questions[activeQuestion].type === 'LIKEDISLIKE'">
            </likeDislike>

            <!-- display like option -->
            <like :id="survey.questions[activeQuestion].id"
                  v-if="survey.questions[activeQuestion].type === 'LIKE'">
            </like>

            <!-- display regulator option -->
            <regulator :id="survey.questions[activeQuestion].id"
                      v-if="survey.questions[activeQuestion].type === 'REGULATOR'">
            </regulator>

            <!-- display special ranking options -->
            <ranking :id="survey.questions[activeQuestion].id"
                    v-if="survey.questions[activeQuestion].type === 'RANKING'">
            </ranking>

            <!-- display special favorite options -->
            <favorite :id="survey.questions[activeQuestion].id"
                      v-if="survey.questions[activeQuestion].type === 'FAVORITE'">
            </favorite>
          </div>
        </b-col>
      </b-row>
      </b-card-body>
      <b-card-footer >
        <b-progress :max="100">
          <b-progress-bar :value="counter" show-progress :label="`${counter}%`">
          </b-progress-bar>
        </b-progress>
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
import { mapGetters } from 'vuex';

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
      isSlave: false,
    };
  },
  async created(this: any) {
    const domainID = this.$route.params.cID;
    this.isSlave = this.$route.name === 'join';
    const client =  localStorage.getItem('client');
    try {
        await this.$store.dispatch('updateClient', {
        id: client,
        domainId: domainID,
        });
        await this.$store.dispatch('getSurvey', {
            domain: domainID,
        });
        this.$store.dispatch('subscribeDomain', {
            domainID,
        });
        this.$store.dispatch('getVotes', {
            surveyID: this.survey.id,
        });
    } catch (error) {
        console.error('slaveQuestion: ', error);
    }
  },
  computed: {
    survey(this: any) {
      return this.$store.getters.getSurvey;
    },
    votes(this: any) {
      return this.$store.getters.getVotes;
    },
    ...mapGetters({
      activeQuestion: 'getActiveQuestion',
    }),
  },
  watch: {
      activeQuestion(this: any, oldActiveQuestion, newActiveQuestion) {
          this.answered = false;
      },
  },
  methods: {
    displayItems(type) {
      return !(type === 'RANKING' || type === 'FAVORITE');
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
.btn_col {
  margin-top: auto;
}
.votes {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  padding-top: 2rem;
}
.row {
  margin-bottom: 1rem;
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
</style>
