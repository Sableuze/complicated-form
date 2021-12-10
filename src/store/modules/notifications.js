/* eslint no-return-assign: 0 */
import { setItem, getItem } from '@/helpers/localStorageHelper';
import Db from '@/api/databaseWrapper';

export default {
  state: {
    notifications: getItem('notifications') || [],
  },

  getters: {
    getAllNotifications: (state) => state.notifications,
    getReadenNotifications: (state) => state.notifications.map((i) => i.status === 'readen'),
    getOutstandingNotifications: (state) => state.notifications.map((i) => i.status === 'outstandig'),
  },

  mutations: {
    readNotifications(state) {
      // eslint-disable-next-line no-return-assign
      state.notifications.map((i) => i.status = 'readen');
      setItem('notifications', state.notifications);
    },

    addNotification(state, payload) {
      state.notifications.push(payload);
      setItem('notifications', state.notifications);
    },

    clearNotifications(state) {
      state.notifications = [];
      setItem('notifications', state.notifications);
    },
  },

  actions: {
    async fetchNotifications({ commit }, { accountId }) {
      const data = await Db.read({ query: `accountId == '${accountId}'`, table: 'notifications' });
      if (data) data.forEach((i) => commit('addNotification', i));
    },

    readNotifications({ commit, getters }) {
      const theNotifications = { ...getters.getOutstandingNotifications };
      theNotifications.map((i) => i.status = 'readen');
      theNotifications.forEach((i) => {
        Db.update({ id: i.id, record: { ...i }, table: 'notifications' });
      });
      commit('readNotifications');
    },

    async createNotification({ commit }, data) {
      const record = {
        accountId: data.accountId,
        msg: data.text,
        status: 'outstanding',
      };
      const res = await Db.create({
        record: { ...record },
        table: 'notifications',
      }, { showResult: false });
      if (res) commit('addNotification', { ...record });
    },
  },
};
