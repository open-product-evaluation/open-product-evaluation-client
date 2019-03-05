import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import SurveyList from '@/components/survey/SurveyList.vue';
import Question from '@/components/question/Question.vue';
import SlaveQuestion from '@/components/question/SlaveQuestion.vue';
import MasterQuestion from '@/components/question/MasterQuestion.vue';

Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'surveyList',
      component: SurveyList,
    },
    {
      path: '/survey/:cID',
      name: 'question',
      component: Question,
    },
    {
      path: '/join/:cID/',
      name: 'join',
      component: SlaveQuestion,
    },
    {
      path: '/master/:cID/',
      name: 'master',
      component: MasterQuestion,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if ((localStorage.getItem('currentToken') === '' || localStorage.getItem('currentToken') === null) &&
          (localStorage.getItem('client') === '' || localStorage.getItem('client') === null) ) {
    store.dispatch('createClient', ({ name: 'mobilePhone'})).then((result) => {
      next();
    });
  } else {
    next();
  }
});

export default router;
