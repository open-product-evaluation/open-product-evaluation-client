import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import SurveyList from '@/components/survey/SurveyList.vue';
import Question from '@/components/question/Question.vue';

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
  ],
});

router.beforeEach((to, from, next) => {
  if ((localStorage.getItem('currentToken') === '' || localStorage.getItem('currentToken') === null) &&
          (localStorage.getItem('client') === '' || localStorage.getItem('client') === null) ) {
    console.log("neuer Client wurde erstellt");
    store.dispatch('createClient', ({ name: 'mobilePhone'})).then((result) => {
      next();
    });
  } else {
    next();
  }
});

export default router;
