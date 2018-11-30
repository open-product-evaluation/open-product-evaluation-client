import Vue from 'vue';
import Vuex from 'vuex';
import Device from '@/api/device';

Vue.use(Vuex);

const state = {
  device: {},
};

const getters = {
  getDevice: (state) => state.device,
};

const mutations = {
  createDevice(state, payload) {
    localStorage.setItem('currentDevice', JSON.stringify(payload.device));
    if (payload.token) { localStorage.setItem('currentToken', payload.token); }
    state.device = payload;
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
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
