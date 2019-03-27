<template>
    <div class="container">
      <b-card no-body>

        <b-card-body>
          <div class="question" v-if="answered && activeQuestion!=survey.questions.length-1"> 
            <h5>Please wait a moment. The question will be presented soon.</h5>
            <b-spinner label="Spinning" />
          </div>

          <div class="question" v-if="activeQuestion==survey.questions.length-1"> 
            <h5>Thank you very much for your participation!</h5>
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
      </b-card-body>
      <b-card-footer v-if="survey.questions.length > 0
                                      && !answered">
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
import { mapGetters } from 'vuex';

export default {
  name: 'SlaveQuestion',
  components: {
    questionItems: QuestionItem,
    choice: ChoiceOptions,
    ranking: RankingOptions,
    favorite: FavoriteOptions,
    regulator: RegulatorOptions,
    like: LikeOptions,
    likeDislike: LikeDislikeOptions,
    questionMeta: QuestionValue,
  },
  data() {
    return {
      index: 0,
      counter: 0,
      answered: true,
      isSlave: false,
    };
  },
  async created(this: any) {
    const domainID = this.$route.params.cID;
    const client =  localStorage.getItem('client');
    try {
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
<style scoped></style>
