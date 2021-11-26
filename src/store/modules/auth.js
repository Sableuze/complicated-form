import { getItem, setItem } from '@/helpers/localStorageHelper';

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
  changeUser(state, userData) {
    state.user = userData;
    setItem('user', state.user);
  },
};

const actions = {
  // login api({ commit }, { login, password }) {
  //
  // },
  login({ commit, state }, role) {
    const newData = { ...state.user };
    newData.role = role;
    commit('changeUser', newData);
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
