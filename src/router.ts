import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import SurveyList from '@/components/survey/SurveyList.vue';
import CreateClient from '@/components/CreateClient.vue';
import LoginClient from '@/components/LoginClient.vue';
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
    {
      path: '/create',
      name: 'create',
      component: CreateClient,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginClient,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'create' || to.name === 'login' ) { next();  return; }
  if (to.name === 'join') {
    store.dispatch('createTemporaryClient', ({ domainID: to.params.cID})).then((result) => {
      next();
    });
  } else {
    if ((localStorage.getItem('currentToken') === '' || localStorage.getItem('currentToken') === null) &&
            (localStorage.getItem('client') === '' || localStorage.getItem('client') === null) ) {
      if (to.name === 'question') {
        store.dispatch('createTemporaryClient', ({ domainID: to.params.cID})).then((result) => {
          next();
        });
      } else {
        next('create');
      }
    } else {
      next();
    }
  }
});

export default router;
