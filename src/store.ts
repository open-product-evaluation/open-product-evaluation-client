import Vue from 'vue';
import Vuex from 'vuex';
import Client from '@/api/client';
import Survey from '@/api/survey';
import Question from '@/api/question';
import Votes from '@/api/votes';

Vue.use(Vuex);

const state = {
  client: {},
  surveys: [],
  currentSurvey: {
    questions: [],
    votes: [],
  },
  test: [],
};

const getters = {
  getClient: () => state.client,
  getSurveys: () => state.surveys || [],
  getSurvey: () => state.currentSurvey,
  getQuestion: () => (questionID) => state.currentSurvey.questions.find( (question: any) => question.id === questionID),
  getVotes: () => state.currentSurvey.votes,
  getVote: () => (questionID) => {
    return filterVotes(questionID);
  },
  getTest: () => state.test,
};

const mutations = {
  createClient(states, payload) {
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
};

const actions = {
  updateClient(context, payload) {
    Client.updateClient(payload.id, payload.domainId)
    .then((data) => {
      context.commit('updateClient', data.data !== undefined ? data.data.updateClient : null);
    });
  },
  createClient(context, payload) {
    return new Promise( (resolve, reject) => {
      // console.error(payload.data['errors'][0].message);
      localStorage.removeItem('currentToken');
      localStorage.removeItem('client');
      Client.createClient( payload.name )
      .then((data) => {
        context.commit('createClient', data.data !== undefined ? data.data.createClient : null);
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
          this.dispatch('createClient', { name: 'DeviceName' })
          .then( () => {
              Survey.getAllSurveys()
              .then( (result: any) => {
                context.commit('setSurveys', result.data !== undefined ? result.data.domains : null);
                resolve(result);
              });
          }, (error) => {
              reject(error);
          });
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
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

function filterVotes(questionID) {
  const result: string[] = [];
  state.currentSurvey.votes.map( (vote) => {
    result.push(filterCurrentQuestionsVotes(vote, (questionID)));
  });
  return result;
}

function filterCurrentQuestionsVotes(vote, questionID) {
  return vote.answers.filter( (answer) => answer.question === questionID);
}
