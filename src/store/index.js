import { createStore } from 'vuex';
import { Notify } from 'quasar';
import rating from '@/api/rating';
import events from './modules/events';
import alerts from './modules/alerts';
import auth from './modules/auth';
import notifications from './modules/notifications';
import { addRequestHandler, addResponseHandler } from '@/api/http';

const store = createStore({
  state: {
    ratingList: [],
    isSuccess: null,
    isLoading: false,
    loadingCount: 0,
    layout: 'layout-default',

  },

  getters: {
    getSuccessStatus: (state) => state.isSuccess,
    // isLoading: (state) => state.isLoading,
    isLoading: (state) => !!state.loadingCount,
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

    // changeLoadingStatus(state, payload) {
    //   state.isLoading = payload;
    // },

    incrementLoading(state) {
      state.loadingCount += 1;
      debugger;
    },

    decrementLoading(state) {
      debugger;
      state.loadingCount -= 1;
    },

    resetLoading(state) {
      state.loadingCount = 0;
    },

    setLayout(state, payload) {
      state.layout = payload;
    },
  },

  actions: {

    async loadRating({ commit }) {
      const response = await rating.getRating();
      if (response) {
        commit('changeRatingList', response);
      }
    },

    changeLoadingStatus({ commit }, status) {
      commit('changeLoadingStatus', status);
    },

    changeSuccessStatus({ commit }, status) {
      commit('changeSuccessStatus', status);
    },

  },

  modules: {
    events, auth, alerts, notifications,
  },
});
addRequestHandler((fn) => {
  store.commit('incrementLoading');

  return fn;
});

addResponseHandler(
  (success) => {
    store.commit('decrementLoading');
    const { config } = success;
    if ('onSuccess' in config && config.showResult) {
      Notify.create({
        message: config.onSuccess,
        type: 'positive',
        position: 'top-right',
      });
    }

    return { ok: true, data: success.data };
  },

  (error) => {
    store.commit('decrementLoading');
    const { config } = error;
    // if (error.response.status === 401) {
    //   // router.push({ name: 'Auth' });
    // }
    // else
    if ('onError' in config && config.showResult) {
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
