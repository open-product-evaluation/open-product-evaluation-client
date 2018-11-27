import Vue from 'vue';
import Router from 'vue-router';

import SurveyList from '@/components/survey/SurveyList.vue';
import Question from '@/components/question/Question.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'surveyList',
      component: SurveyList,
    },
    {
      path: '/question',
      name: 'question',
      component: Question,
    },
  ],
});
