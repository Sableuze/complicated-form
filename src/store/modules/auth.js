import { getItem, setItem } from '@/helpers/localStorageHelper';
import Auth from '@/api/authApi';

const state = {
  user: getItem('user') || {
    name: '',
    surname: '',
    id: '',
    isOnline: '',
    role: '',
  },
  sessionId: getItem('sessionId') || '',
  // isRegistrationSuccess: null,
  // isLoginSuccess: null,

  authErrors: [],
};

const getters = {
  getUser: (state) => state.user,
  getUserRole: (state) => state.user.role,
  isLoggedIn: (state) => !!state.user.role,
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
    const { id, userId, status } = await Auth.login(login, password);
    commit('changeLoadingStatus', false);
    if (id && userId) {
      commit('setSessionId', id);
      await dispatch('updateUser', userId);
    } else {
      return status;
    }
  },

  async register({ commit }, { login, username, password }) {
    commit('changeLoadingStatus', true);
    const response = await Auth.register(login, username, password);
    console.log(response);
    debugger;
  },

  async updateUser({ commit }, userId) {
    const { email, username, id, profile } = await Auth.getUserInfo(userId);
    commit('setUser', { email, username, accountId: id, profile });
  },

  logout({ commit }) {
    commit('sessionId', '');
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
