import Vue from 'vue';
import Vuex from 'vuex';
import Client from '@/api/client';
import Survey from '@/api/survey';
import Question from '@/api/question';
import Votes from '@/api/votes';
import Domain from '@/api/domain';

Vue.use(Vuex);

const state = {
  client: {},
  surveys: [],
  currentSurvey: {
    questions: [],
    votes: []
  },
  answers: [],
  domain: {
    activeQuestion: -1,
  }
};

const getters = {
  getClient: () => state.client,
  getSurveys: () => state.surveys || [],
  getSurvey: () => state.currentSurvey,
  getQuestion: () => (questionID) => state.currentSurvey.questions.find( (question: any) => question.id === questionID),
  getQuestionIndex: () => (questionID) => state.currentSurvey.questions.findIndex( 
      (question: any) => question.id === questionID),
  getActiveQuestion: () => state.domain.activeQuestion,
  getVotes: () => state.currentSurvey.votes,
  getVote: () => (questionID) => {
    return filterVotes(questionID);
  },
  getAnswers: () => (questionID) => state.answers.filter( (answer: any) => answer.question === questionID),
};

const mutations = {
  createClient(states, payload) {
    if (payload.code) {
      localStorage.setItem('clientCode', payload.code);
    }
    if (payload.token) {
      localStorage.setItem('currentToken', payload.token);
    }
    localStorage.setItem('client', payload.client.id);
    states.client = payload;
  },
  updateClient(states, payload) {
    localStorage.setItem('client', payload.client.id);
    states.client = payload;
  },
  currentSurvey(states, payload) {
    states.currentSurvey = payload;
    states.answers = [];
  },
  setSurveys(states, payload) {
    states.surveys = payload;
  },
  currentQuestions(states, payload) {
    states.currentSurvey.questions = payload;
  },
  currentVotes(states, payload) {
    states.currentSurvey.votes = payload;
  },
  setActiveQuestion(states, index) {
    states.domain.activeQuestion = index;
  },
  addAnswer(states, payload) {
    states.answers.push(payload.answer);
  },
};

const actions = {
  updateClient(context, payload) {
    Client.updateClient(payload.id, payload.domainId)
    .then((data: any) => {
      context.commit('updateClient', data.data !== undefined ? data.data.updateClient : null);
    });
  },
  createPermanentClient(context, payload) {
    return new Promise( (resolve, reject) => {
      // console.error(payload.data['errors'][0].message);
      localStorage.removeItem('currentToken');
      localStorage.removeItem('client');
      localStorage.removeItem('clientCode');
      Client.createPermanentClient( payload.name, payload.clientOwner )
      .then((data: any) => {
        context.commit('createClient', data.data !== undefined ? data.data.createPermanentClient : null);
        resolve(data.data);
      },
      (error) => {
        reject(error);
      });
    });
  },
  createTemporaryClient(context, payload) {
    return new Promise( (resolve, reject) => {
      localStorage.removeItem('currentToken');
      localStorage.removeItem('client');
      localStorage.removeItem('clientCode');
      Client.createTemporaryClient( payload.domainID )
      .then((data: any) => {
        context.commit('createClient', data.data !== undefined ? data.data.createTemporaryClient : null);
        resolve(data.data);
      },
      (error) => {
        reject(error);
      });
    });
  },
  loginClient(context, payload) {
    return new Promise( (resolve, reject) => {
      localStorage.removeItem('currentToken');
      localStorage.removeItem('client');
      localStorage.removeItem('clientCode');
      Client.loginClient( payload.code, payload.email )
      .then((data: any) => {
        context.commit('createClient', data.data !== undefined ? data.data.loginClient : null);
        resolve(data.data);
      },
      (error) => {
        reject(error);
      });
    });
  },
  getSurveys(this: any, context) {
    return new Promise( (resolve, reject) => {
      Survey.getAllSurveys()
      .then( (data: any) => {
        if ( data.errors == null ) {
            context.commit('setSurveys', data.data !== undefined ? data.data.domains : null);
        } else {
          // Token has expired
          reject('invalidToken');
        }
      });
    });
  },
  getSurvey(context, payload) {
    return new Promise( (resolve, reject) => {
    Survey.getSurvey(payload.domain)
      .then((data: any) => {
        if (data === undefined) {
          reject(data);
        } else {
        context.commit('currentSurvey', data.data !== undefined ? data.data.domain.activeSurvey : null);
        context.commit('currentQuestions', data.data !== undefined ? data.data.domain.activeSurvey.questions : null);
        resolve(data);
        }
      });
    });
  },
  getVotes(context, payload) {
    Votes.getVotes(payload.surveyID)
      .then((data: any) => {
        context.commit('currentVotes', data.data !== undefined ? data.data.votes : null);
      });
  },
  createAnswerChoice(context, payload) {
    Question.choiseAnswer( payload.question, payload.choiceID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  createAnswerLike(context, payload) {
    Question.likeAnswer( payload.question, payload.likeID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  createAnswerLikeDislike(context, payload) {
    Question.likeAnswer( payload.question, payload.likeID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  createAnswerFavorite(context, payload) {
    Question.favoriteAnswer( payload.question, payload.favoriteID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  createAnswerRegulator(context, payload) {
    Question.regulatorAnswer( payload.question, payload.ratingID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  createAnswerRanking(context, payload) {
    Question.rankingAnswer( payload.question, payload.rankingID)
    .then((data) => {
      // TODO:  Do something with response?
    });
  },
  subscribeDomain(store, {domainID}) {
    // subscription is not saved in store because of mutation problems
    // gets passed back to component
    const subscription = Domain.onDomainUpdate(domainID);
    const v = subscription.subscribe({
      next(data) {
        if (!data.errors) {
          // completely retarded implementation, but ... https://github.com/apollographql/apollo-client/issues/1909
          // ... also, once in store it is frozen again.
          const activeQuestion = data.data.domainUpdate.domain.activeQuestion;
          if (activeQuestion){
            const index = store.getters.getQuestionIndex(activeQuestion.id);
            store.commit('setActiveQuestion', index);
          }
        } else {
          console.log(data.errors);
        }
      },
    });
    return v;
  },
  subscribeAnswers(store, {domainID}) {
    // subscription is not saved in store because of mutation problems
    // gets passed back to component
    const subscription = Domain.onAnswer(domainID);
    const v = subscription.subscribe({
      next(data) {
        if (!data.errors) {
          // completely retarded implementation, but ... https://github.com/apollographql/apollo-client/issues/1909
          // ... also, once in store it is frozen again.
          store.commit('addAnswer', data.data.answerUpdate);
        } else {
          console.log(data.errors);
        }
      },
    });
    return v;
  },
  subscribeClient(store, {clientID}) {
    // subscription is not saved in store because of mutation problems
    // gets passed back to component
    const subscription = Client.onClientUpdate(clientID);
    const v = subscription.subscribe({
      next(data) {
        if (!data.errors) {
          // completely retarded implementation, but ... https://github.com/apollographql/apollo-client/issues/1909
          // ... also, once in store it is frozen again.
          if(data.data.clientUpdate.event === 'DELETE') {
            localStorage.removeItem('currentToken');
            localStorage.removeItem('client');
            localStorage.removeItem('clientCode');
            location.reload();
            console.log('delete')
          } else if (data.data.clientUpdate.changedAttributes
              && data.data.clientUpdate.changedAttributes.includes('domain')
              && data.data.clientUpdate.client.domain === null) {
            // Client removed from domain
            location.href = '/';
          }
        } else {
          console.log(data.errors);
        }
      },
    });
    return v;
  },
  unsubscribe(context, payload) {
    // component passes subscription via payload
    payload.unsubscribe();
  },
  updateActiveQuestion(store, {domainID, questionID}) {
    return Domain.updateActiveQuestion( domainID, questionID)
    .then((data) => {
    });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

function filterVotes(questionID) {
  const result: string[] = [];
  if (state.currentSurvey.votes !== undefined && state.currentSurvey.votes !== null) {
    state.currentSurvey.votes.map( (vote) => {
      result.push(filterCurrentQuestionsVotes(vote, (questionID)));
    });
  }
  return result;
}

function filterCurrentQuestionsVotes(vote, questionID) {
  return vote.answers.filter( (answer) => answer.question === questionID);
}
