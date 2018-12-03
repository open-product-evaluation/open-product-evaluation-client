import Vue from 'vue';
import Vuex from 'vuex';
import Device from '@/api/device';
import Survey from '@/api/survey';

Vue.use(Vuex);

const state = {
  device: {},
  surveys: [],
  currentSurvey: {
    questions: [],
    votes: [],
  },
};

const getters = {
  getDevice: (state) => state.device,
  getSurveys: (state) => state.surveys || [],
  getSurvey: (state) => state.currentSurvey,
};

const mutations = {
  createDevice(state, payload) {
    localStorage.setItem('currentDevice', JSON.stringify(payload.device));
    if (payload.token) { localStorage.setItem('currentToken', payload.token); }
    state.device = payload;
  },
  currentSurvey(_state, payload) {
    // eslint-disable-next-line
    _state.currentSurvey = payload;
  },
  setSurveys(_state, payload) {
    // eslint-disable-next-line
    _state.surveys = payload;
  },
};

const actions = {
  updateDevice(context, payload) {
    Device.updateDevice(payload.id, payload.contextId)
    .then((data) => {
      context.commit('createDevice', data.data !== undefined ? data.data.updateDevice : null);
    });
  },
  createDevice(context, payload) {
    Device.createDevice( payload.name)
    .then((data) => {
      context.commit('createDevice', data.data !== undefined ? data.data.createDevice : null);
    });
  },
  getSurveys(context) {
    Survey.getAllSurveys()
      .then((data) => {
        context.commit('setSurveys', data.data !== undefined ? data.data["surveys"] : null);
      });
  },
  getSurvey(context, payload) {
    Survey.getSurvey(payload.context)
      .then((data) => {
        context.commit('currentSurvey', data.data !== undefined ? data.data["survey"] : null);
      });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
