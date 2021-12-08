import { createStore } from 'vuex';
import { Notify } from 'quasar';
import rating from '@/api/rating';
import events from './modules/events';
import alerts from './modules/alerts';
import auth from './modules/auth';
import { addRequestHandler, addResponseHandler } from '@/api/http';

const store = createStore({
  state: {
    ratingList: null,
    isSuccess: null,
    isLoading: false,
    layout: 'layout-default',

  },

  getters: {
    getSuccessStatus: (state) => state.isSuccess,
    getLoadingStatus: (state) => state.isLoading,
    getRatingList: (state) => state.ratingList,
    getLayout: (state) => state.layout,
  },

  mutations: {
    changeRatingList(state, payload) {
      state.ratingList = payload;
    },

    changeSuccessStatus(state, payload) {
      state.isSuccess = payload;
    },

    changeLoadingStatus(state, payload) {
      state.isLoading = payload;
    },

    setLayout(state, payload) {
      debugger;
      state.layout = payload;
    },
  },

  actions: {

    async loadRating({ commit }) {
      commit('changeLoadingStatus', true);
      const response = await rating.getRating();
      if (response) {
        commit('changeRatingList', response);
      }
      commit('changeLoadingStatus', false);
    },

    changeLoadingStatus({ commit }, status) {
      commit('changeLoadingStatus', status);
    },

    changeSuccessStatus({ commit }, status) {
      commit('changeSuccessStatus', status);
    },

  },

  modules: {
    events, auth, alerts,
  },
});
addRequestHandler((fn) => {
  store.dispatch('changeLoadingStatus', true);
  return fn;
});

addResponseHandler(
  (success) => {
    store.dispatch('changeLoadingStatus', false);
    const { config } = success;
    if ('onSuccess' in config) {
      Notify.create({
        message: config.onSuccess,
        type: 'positive',
        position: 'top-right',
      });
    }

    return { ok: true, data: success.data };
  },

  (error) => {
    store.dispatch('changeLoadingStatus', false);
    const { config } = error;
    if ('onError' in config) {
      Notify.create({
        message: config.onError,
        type: 'negative',
        position: 'top-right',
      });
      return { ok: false };
    }
    return Promise.reject((error));
  },
);

export default store;
