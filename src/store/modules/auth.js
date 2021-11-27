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
};

const getters = {
  getUser: (state) => state.user,
  getUserRole: (state) => state.user.role,
  isLoggedIn: (state) => !!state.user.role,
};

const mutations = {
  changeUser(state, user) {
    state.user = user;
    setItem('user', state.user);
  },
};

const actions = {
  async login({ commit }, { login, password }) {
    const user = await Auth.login(login, password);
    debugger;
    if (user) {
      commit('changeUser', user);
    }
  },

  logout({ commit }) {
    commit('changeUser', {});
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
