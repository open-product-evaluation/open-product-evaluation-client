import Vue from 'vue';
import Vuex from 'vuex';
import Client from '@/api/client';
import Survey from '@/api/survey';
import Question from '@/api/question';

Vue.use(Vuex);

const state = {
  client: {},
  surveys: [],
  currentSurvey: {
    questions: [],
    votes: [],
  },
};

const getters = {
  getClient: (state) => state.client,
  getSurveys: (state) => state.surveys || [],
  getSurvey: (state) => state.currentSurvey,
  getQuestion: (state) => (questionID) => state.currentSurvey.questions.find( (question) => question.id === questionID),
 };

const mutations = {
  createClient(state, payload) {
    localStorage.setItem('currentClient', JSON.stringify(payload.client));
    if (payload.token) { localStorage.setItem('currentToken', payload.token); }
    state.client = payload;
  },
  currentSurvey(state, payload) {
    state.currentSurvey = payload;
  },
  setSurveys(state, payload) {
    state.surveys = payload;
  },
  currentQuestions(state, payload) {
    state.currentSurvey.questions = payload;
  },
};

const actions = {
  updateClient(context, payload) {
    Client.updateClient(payload.id, payload.domainId)
    .then((data) => {
      context.commit('createClient', data.data !== undefined ? data.data.updateClient : null);
    });
  },
  createClient(context, payload) {
    Client.createClient( payload.name)
    .then((data) => {
      context.commit('createClient', data.data !== undefined ? data.data.createClient : null);
    });
  },
  getSurveys(context) {
    Survey.getAllSurveys()
      .then((data) => {
        context.commit('setSurveys', data.data !== undefined ? data.data["domains"] : null);
      });
  },
  getSurvey(context, payload) {
    Survey.getSurvey(payload.domain)
      .then((data) => {
        context.commit('currentSurvey', data.data !== undefined ? data.data["domain"].activeSurvey : null);
        context.commit('currentQuestions', data.data !== undefined ? data.data["domain"].activeSurvey.questions : null);
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
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
