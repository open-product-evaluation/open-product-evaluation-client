<template>
  <div class="container">
      <b-card no-body class="shadow bg-white rounded">
        <b-card-header>
          <h4>{{ survey.title }}</h4>
          <p class="description">
            {{ survey.description }}
          </p>
        </b-card-header>

        <!-- QR-Code -->
        <b-card-body v-if="index == -1">
                    <div class="question" > 
            <h5>You can join the survey now!</h5>
            <qrcode :value="joinLink" :options="{ width: 500 }"></qrcode>
          </div>
        </b-card-body>

      <b-tabs card v-if="index > -1">
      <!-- Question -->
      <b-tab no-body title="Question" active>
        <b-card-body class="py-0">
            <div class="progress w-100" v-if="index > -1 && survey.questions && survey.questions.length > 8">
              <b-progress :max="100">
                <b-progress-bar :value="counter" show-progress :label="`${counter}%`">
                </b-progress-bar>
              </b-progress>
            </div>
            <b-row class="m-0">
              <div class="w-100 my-3" v-if="index > -1 && survey.questions && survey.questions.length <= 8">
                <step-indicator current-color='#ffaa11' :current="index" :total="survey.questions.length"></step-indicator>
              </div>
              <div class="w-100" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0
                                      && index > -1">
              <!-- display question title and description -->
              <questionMeta :id="survey.questions[index].id"></questionMeta>

            <!-- display question items -->
            <questionItems :id="survey.questions[index].id">
            </questionItems>
            </div>
            </b-row>
        </b-card-body>
      </b-tab>

      <!-- Votes -->
      <b-tab no-body title="Votes">
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
              </div>
          </b-row>
          <div class="votes" v-if="survey.questions
                                        && survey.questions.length
                                        && survey.questions.length > 0 
                                        && index > -1">
            <h3>Previous votes</h3>
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
        </b-card-body>
      </b-tab>
    </b-tabs>
    <b-card-footer>
        <b-btn variant="primaryBtn" class="float-right" @click="next" v-if="index >=0 && index !== survey.questions.length -1">Next
        </b-btn>
      <b-btn variant="primaryBtn" @click="next"
          v-if="index == survey.questions.length -1"> Finish
      </b-btn>
      <b-btn variant="primaryBtn" @click="next"
          v-if="index == -1"> Start
      </b-btn>
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
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  name: 'MasterQuestion',
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
    qrcode: VueQrcode,
  },
  data() {
    return {
      index: -1,
      counter: 0,
      subscribtion: null,
    };
  },
  created(this: any) {
    const domainID = this.$route.params.cID;
    this.$store.dispatch('subscribeAnswers', {
          domainID,
    }).then((data) => this.subscription = data);
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
  beforeDestroy(this: any) {
    this.$store.dispatch('unsubscribe', this.subscription);
  },
  computed: {
    survey(this: any) {
      return this.$store.getters.getSurvey;
    },
    votes(this: any) {
      return this.$store.getters.getVotes;
    },
    joinLink(this: any) {
      return window.location.protocol + '//' + window.location.host + '/#/join/' + this.$route.params.cID;
    },
  },
  methods: {
    next(this: any) {
      // Last Question to Home
        if (this.index < this.survey.questions.length - 1) {
          this.index++;
        }else{
          this.$router.push({name: 'surveyList'});
          return;
        }
      // show next question
        this.counter = Math.floor(this.index / this.survey.questions.length * 100);
        this.$store.dispatch('updateActiveQuestion', {
          domainID: this.$route.params.cID,
          questionID: this.survey.questions[this.index].id,
        });
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
.votes {
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  padding-top: 2rem;
}
.row {
  margin-bottom: 1rem;
}
  @media (min-width: 540px) {
  .container {
    width: 80%;
    margin: 1.5rem auto;
    }
}
@media (max-width: 540px) {
  .container {
    width: 100%;
    margin: 0 auto;
    }
}
</style>
