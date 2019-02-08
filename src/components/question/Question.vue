<template>
  <div class="preview">
    <div class="container">
      <b-card>

        <!-- <h3>{{ survey.title }}</h3> -->

        <p class="description">
          {{ survey.description }}
        </p>

        <div class="question" v-if="survey.questions
                                    && survey.questions.length
                                    && survey.questions.length > 0">

          <!-- display question title and description -->
          <questionmeta :id="survey.questions[index].id"></questionmeta>

          <!-- display question items -->
          <questionitems :id="survey.questions[index].id"
                 v-if="displayItems(survey.questions[index].type)">
          </questionitems>

          <!-- display choices -->
          <choice :id="survey.questions[index].id"
                  v-if="survey.questions[index].type === 'CHOICE'">
          </choice>

          <!-- display like / dislike options -->
          <likedislike :id="survey.questions[index].id"
                       v-if="survey.questions[index].type === 'LIKEDISLIKE'">
          </likedislike>

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

        <b-row v-if="survey.questions
                     && survey.questions.length
                     && survey.questions.length > 0">
          <b-col cols="4">
            <b-btn variant="primary"
                   @click="previous"
                   v-if="index !== 0">
              Previous
            </b-btn>
          </b-col>
          <b-col class="text-center">
            <b-btn variant="secondary"
                   @click="index = 0"
                   v-if="index > 0">
              Start
            </b-btn>
          </b-col>
          <b-col cols="4" class="text-right">
            <b-btn variant="primary"
                   @click="next"
                   v-if="index !== survey.questions.length - 1">
              Next
            </b-btn>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QuestionItem from '@/components/question/QuestionItem.vue';
import ChoiceOptions from '@/components/question/ChoiceOption.vue';
import RankingOptions from '@/components/question/RankingOption.vue';
import FavoriteOptions from '@/components/question/FavoriteOption.vue';
import RegulatorOptions from '@/components/question/RegulatorOption.vue';
import LikeOptions from '@/components/question/LikeOption.vue';
import LikeDislikeOptions from '@/components/question/LikeDislikeOption.vue';
import QuestionValue from '@/components/question/QuestionValue.vue';

const store = '$store';
const router = '$router';
const route = '$route';

export default {
  name: 'Question',
  components: {
    questionItem: QuestionItem,
    choice: ChoiceOptions,
    ranking: RankingOptions,
    favorite: FavoriteOptions,
    regulator: RegulatorOptions,
    like: LikeOptions,
    likeDislike: LikeDislikeOptions,
    questionmeta: QuestionValue,
  },
  data() {
    return {
      index: 0,
    }
  },
  created() {
    let contextID= this[route].params.cID;
    this[store].dispatch('getSurvey', {
        context: contextID,
      });
  },
  computed: {
    survey() {
      return this[store].getters.getSurvey
    },
  },
  methods: {
    displayItems(type) {
      return !(type === 'RANKING' || type === 'FAVORITE')
    },
    next() {
      (this.index < this.survey.questions.length-1) ? (this.index++) : this[router].push({name:'surveyList'});
    },
    previous(){
      if (this.index > 0) {
        this.index -= 1;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
