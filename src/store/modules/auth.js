import { getItem, setItem } from '@/helpers/localStorageHelper';

export default (Auth) => ({

  state: {
    user: getItem('user') || {
      profile: {},
    },
    session: getItem('session') || '',
    // isRegistrationSuccess: null,
    // isLoginSuccess: null,

    authErrors: [],
  },

  getters: {
    getUser: (state) => state.user,
    getAccountId: (state) => state.user.accountId,
    isProfileFilled: (state) => state.user?.profile
      && Object.values(state.user.profile).length
      && Object.values(state.user.profile).every((i) => i),
    getUserRole: (state) => state.user.profile.role,
    isLoggedIn: (state) => !!state.user.username,
    getAuthErrors: (state) => state.authErrors,
  },

  mutations: {
    setUser(state, user) {
      debugger;
      state.user = user;
      setItem('user', state.user);
    },
    setSession(state, { id, expires }) {
      debugger;
      state.session = { id, expires };
      setItem('session', state.session);
    },

    setAuthErrors(state, error) {
      state.authErrors.push(error);
    },

    resetAuthErrors(state, status) {
      state.authErrors = status;
    },
    //
    // changeLoginStatus(state, status) {
    //   state.isLoginSuccess = status;
    // },
    // changeRegistrationStatus(state, status) {
    //   state.isRegistrationSuccess = status;
    // },
  },

  actions: {
    async login({ commit, dispatch }, { login, password }) {
      commit('changeLoadingStatus', true);
      const { id, expires, userId } = await Auth.login(login, password);
      commit('changeLoadingStatus', false);
      if (id && userId) {
        commit('setSession', { id, expires });
        await dispatch('readUser', userId);
      }
    },

    async register({ commit }, { email, username, password }) {
      commit('changeLoadingStatus', true);

      const { id, status } = await Auth.register({ email, username, password });
      commit('changeLoadingStatus', false);

      if (id) {
        return true;
      }
      return status;
    },

    async readUser({ commit, dispatch }, userId) {
      const { email, username, id, profile } = await Auth.readUserById(userId);
      commit('setUser', { email, username, accountId: id, profile });

      if (profile.role === 'admin') dispatch('fetchAllSuggestedEvents');
    },

    async updateUserInfo({ dispatch }, { id, data }) {
      const { ok } = await Auth.updateUserInfo({ id, data });
      if (ok) {
        dispatch('readUser', id);
      }
      return ok;
    },

    async logout({ commit }) {
      const session = getItem('session');
      commit('setSession', '');
      commit('setUser', []);
      if (session?.id) await Auth.logout(session.id);
    },

    // changeAuthStatus({ commit }, { target, status }) {
    //   if (target === 'login') commit('changeLoginStatus', status);
    //   else if (target === 'registration') commit('changeRegistrationStatus', status);
    // },
  },

});
