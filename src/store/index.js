import { createStore } from 'vuex';
import initEventsModule from './modules/events';
import initAuthModule from './modules/auth';
import initNotificationsModule from './modules/notifications';
import initCheckCodeModule from './modules/codeRedeem';
import initInputDataModule from './modules/inputData';

export default function initNewStore(api, channel) {
  const events = initEventsModule(api.database, channel);
  const auth = initAuthModule(api.auth);
  const notifications = initNotificationsModule(api.database);
  const inputData = initInputDataModule(api.address);
  const codeRedeem = initCheckCodeModule(api.database);

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

      incrementLoading(state) {
        state.loadingCount += 1;
      },

      decrementLoading(state) {
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
      // eslint-disable-next-line no-unused-vars
      async loadRating({ commit }) {
        return true;
        // const response = await rating.getRating();
        // if (response) {
        //   commit('changeRatingList', response);
        // }
      },

      changeLoadingStatus({ commit }, status) {
        commit('changeLoadingStatus', status);
      },

      changeSuccessStatus({ commit }, status) {
        commit('changeSuccessStatus', status);
      },
    },

    modules: {
      events,
      auth,
      notifications,
      inputData,
      codeRedeem,
    },

  });
  return store;
}
