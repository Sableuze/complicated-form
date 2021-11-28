import { createStore } from 'vuex';
import rating from '@/api/rating';
import events from '@/store/modules/events';
import auth from '@/store/modules/auth';

// eslint-disable-next-line no-unused-vars
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
// eslint-disable-next-line no-unused-vars
import { formatDates, reformatDates } from '@/helpers/reformatDatesHelper';

export default createStore({
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

    // async fetchTracks({ commit }) {
    //   commit('changeLoadingStatus', true);
    //   const response = await track.getTracks(this.state.user.role);
    //   if (response.data && response.data.length) {
    //     if (this.state.user.role !== 'teacher') {
    //       response.data = response.data.filter((item) => item.data.published === true);
    //     }
    //     response.data.map((i) => reformatDates(i.data));
    //     commit('changeTracks', response.data);
    //   }
    //   commit('changeLoadingStatus', false);
    // },
    //
    // async createEvent({commit}, form) {
    //   // проверяем, загрузил ли пользователь изображение, и, если да,
    //   // заменяем ссылку в previewPicture
    //   // if (form.previewPicture instanceof FormData) {
    //   //   const imgUrl = await products.uploadImage(form.previewPicture, /////);
    //   //     form.previewPicture = imgUrl;
    //   // }
    //   form = formatDates(form);
    //   const response = await track.createEvent(form, /////);
    //   if (response) {
    //     commit('removeTracks');
    //     commit('changeSuccessStatus', true);
    //   } else {
    //     commit('changeSuccessStatus', false);
    //   }
    // },

    // async editTrack({ commit, state }, data) {
    //   if (data.form.previewPicture instanceof FormData) {
    //     data.form.previewPicture = await track.uploadImage(data.form.previewPicture,
    //       this.getters.getUser.role);
    //   }
    //   data.form = formatDates(data.form);
    //   const response = await track.changeTrack(data.id, data.form, this.getters.getUser.role);
    //   if (response) {
    //     data.form = reformatDates(data.form);
    //
    //     const trackIndex = state.tracks.findIndex((i) => i.id === data.id);
    //     const currentTrack = state.tracks[trackIndex].data;
    //     commit('changeTrack', { currentTrack, form: data.form });
    //     commit('changeSuccessStatus', true);
    //   } else {
    //     commit('changeSuccessStatus', false);
    //   }
    // },

    changeLoadingStatus({ commit }, status) {
      commit('changeLoadingStatus', status);
    },

    changeSuccessStatus({ commit }, status) {
      commit('changeSuccessStatus', status);
    },

  },

  modules: {
    events, auth,
  },
});
