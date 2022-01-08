export default (Address) => ({
  state: {
    // city: '',
  },
  getters: {
    // getCity: (state) => state.city,
  },
  mutations: {
    // setCity(state, city) {
    //   state.city = city;
    // },
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    async fetchCity({ commit }, { query }) {
      const res = await Address.getCity(query);
      if (res) return res;
    },
    // eslint-disable-next-line no-unused-vars
    async fetchStreet({ commit }, { query, city }) {
      const res = await Address.getStreet(query, city);
      if (res) return res;
    },

    // eslint-disable-next-line no-unused-vars
    async fetchHouse({ commit }, { query, streetId }) {
      const res = await Address.getHouse(query, streetId);
      if (res) return res;
    },
  },
});
