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
    const { id, userId, status } = await Auth.login(login, password);
    commit('changeLoadingStatus', false);
    if (id && userId) {
      commit('setSessionId', id);
      await dispatch('updateUser', userId);
    } return status;
  },

  async register({ commit }, { email, username, password }) {
    commit('changeLoadingStatus', true);
    const { id, status } = await Auth.register(email, username, password);
    commit('changeLoadingStatus', false);

    if (id) {
      this.$router.push({ name: 'Login' });
    } else return status;
  },

  async updateUser({ commit }, userId) {
    const { email, username, id, profile } = await Auth.readUserById(userId);
    commit('setUser', { email, username, accountId: id, profile });
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
