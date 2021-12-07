import { getItem, setItem } from '@/helpers/localStorageHelper';
import Auth from '@/api/authApi';

const state = {
  user: getItem('user') || {
    name: '',
    surname: '',
    id: '',
    isOnline: '',
  },
  sessionId: getItem('sessionId') || '',
  // isRegistrationSuccess: null,
  // isLoginSuccess: null,

  authErrors: [],
};

const getters = {
  getUser: (state) => state.user,
  isProfileFilled: (state) => Object.values(state.user.profile).every((i) => i),
  getUserRole: (state) => state.user.profile.role,
  isLoggedIn: (state) => !!state.user.username,
  getAuthErrors: (state) => state.authErrors,
};
const mutations = {
  setUser(state, user) {
    state.user = user;
    setItem('user', state.user);
  },
  setSessionId(state, id) {
    state.sessionId = id;
    setItem('sessionId', state.sessionId);
  },

  setAuthErrors(state, error) {
    state.authErrors.push(error);
  },

  resetAuthErrors(state, status) {
    debugger;
    state.authErrors = status;
  },
  //
  // changeLoginStatus(state, status) {
  //   state.isLoginSuccess = status;
  // },
  // changeRegistrationStatus(state, status) {
  //   state.isRegistrationSuccess = status;
  // },

};

const actions = {
  async login({ commit, dispatch }, { login, password }) {
    commit('changeLoadingStatus', true);
    const { id, userId } = await Auth.login(login, password);
    commit('changeLoadingStatus', false);
    if (id && userId) {
      commit('setSessionId', id);
      await dispatch('readUser', userId);
    }
  },

  async register({ commit }, { email, username, password }) {
    commit('changeLoadingStatus', true);
    debugger;
    const { id, status } = await Auth.register({ email, username, password });
    commit('changeLoadingStatus', false);

    if (id) {
      return true;
    } return status;
  },

  async readUser({ commit, dispatch }, userId) {
    const { email, username, id, profile } = await Auth.readUserById(userId);
    commit('setUser', { email, username, accountId: id, profile });
    if (profile.role === 'admin') dispatch('getAllSuggestedEvents');
  },

  async updateUserInfo({ commit, dispatch }, { id, data }) {
    commit('changeLoadingStatus', true);
    const { status } = await Auth.updateUserInfo({ id, data });
    commit('changeLoadingStatus', false);
    if (!status) {
      dispatch('readUser', id);
      commit('changeSuccessStatus', true);
    } else {
      commit('changeSuccessStatus', false);
      return status;
    }
  },

  logout({ commit }) {
    commit('setSessionId', '');
    commit('setUser', '');
  },

  // changeAuthStatus({ commit }, { target, status }) {
  //   if (target === 'login') commit('changeLoginStatus', status);
  //   else if (target === 'registration') commit('changeRegistrationStatus', status);
  // },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
