export default {
  namespaced: true,

  state: {
    messages: [],
  },

  getters: {
    all: (state) => state.messages,
    lastId: (state) => Math.max(0, ...state.messages.map((i) => i.id)),
  },

  mutations: {
    add(state, message) {
      state.messages.push(message);
    },
  },

  actions: {
    add({ commit, getters }, { type, text }) {
      commit('add', { id: getters.lastId + 1, type, text });
    },
  },
};
