<template>
    <div class="container">
      <b-card no-body>
        <b-card-header>
          <h3>{{ survey.title }}</h3>
          <p class="description">
            {{ survey.description }}
          </p>
        </b-card-header>

        <b-card-body>
        <b-row >
          <b-col md="1"/>
          <b-col md="10">
          <div class="question" v-if="index == -1"> 
            <h5>Bitte starten Sie die Umfrage!</h5>
            <qrcode :value="joinLink" :options="{ width: 500 }"></qrcode>
          </div>

          
          <!-- TODO Choose progressBar oder ProgressSteps --> 
          <div class="stepper" v-if="index > -1">
              <step-indicator :current="index" :total="survey.questions.length"></step-indicator>
          </div>

          <div class="question" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0
                                      && index > -1">
            <!-- display question title and description -->
            <questionMeta :id="survey.questions[index].id"></questionMeta>

            <!-- display question items -->
            <questionItems :id="survey.questions[index].id"
                  v-if="displayItems(survey.questions[index].type)">
            </questionItems>
          </div>
        </b-col>
        <b-col cols="1" class="btn_col"
                v-if="!answered">
          <label class="next_btn">
            <input type="button"
                @click="showResults"/>
            <v-icon variant="primary" class="icon" name="arrow-alt-circle-right" ></v-icon>
            </label>
        </b-col>
        <b-col cols="1" class="btn_col"
                v-if="answered">
          <label class="next_btn" 
                v-if="index !== survey.questions.length - 1">
            <input type="button"
                @click="next"/>
            <v-icon variant="primary" class="icon" name="arrow-alt-circle-right" ></v-icon>
            </label>
          <b-btn variant="secondary" @click="next"
                  v-if="index == survey.questions.length -1">Start
          </b-btn>
        </b-col>
      </b-row>
      <div class="votes" v-if="survey.questions
                                      && survey.questions.length
                                      && survey.questions.length > 0 
                                      && answered
                                      && index > -1">
          <h5> Bisheriges Ergebnis </h5>
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
      <b-card-footer>
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
      answered: true,
    };
  },
  created(this: any) {
    const domainID = this.$route.params.cID;
    this.$store.dispatch('subscribeAnswers', {
          domainID,
    });
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
    joinLink(this: any) {
      return window.location.protocol + '//' + window.location.host + '/#/join/' + this.$route.params.cID;
    },
  },
  methods: {
    displayItems(type) {
      return !(type === 'RANKING' || type === 'FAVORITE');
    },
    next(this: any) {
        (this.index < this.survey.questions.length - 1) ? (this.index++) : this.$router.push({name: 'surveyList'});
        if(this.index - 1 > 0) { this.$root.$emit('next', this.survey.questions[this.index - 1].type); }
        this.counter = Math.floor(this.index / this.survey.questions.length * 100);
        this.answered = false;
        this.$store.dispatch('updateActiveQuestion', {
          domainID: this.$route.params.cID,
          questionID: this.survey.questions[this.index].id,
        });
    },
    showResults(this: any){
      this.answered = true;
    }
  }
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
