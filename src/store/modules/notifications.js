/* eslint no-return-assign: 0 */
// import { setItem, getItem } from '@/helpers/localStorageHelper';
import Db from '@/api/databaseService';

export default {
  state: {
    notifications: [],
  },

  getters: {
    getAllNotifications: (state) => state.notifications.sort((a, b) => b.date - a.date),
    getSeenNotifications: (state) => state.notifications.filter((i) => i.status === 'seen'),
    getOutstandingNotifications: (state) => state.notifications.filter((i) => i.status === 'outstanding'),
  },

  mutations: {
    readNotifications(state) {
      // eslint-disable-next-line no-return-assign
      state.notifications.map((i) => (i.status = 'seen'));
    },

    setNotifications(state, notifications) {
      state.notifications = notifications;
    },

    clearNotifications(state) {
      state.notifications = [];
    },
  },

  actions: {
    async fetchNotifications({ commit, getters }) {
      const accountId = getters.getAccountId;
      const { records } = await Db.read({
        query: `accountId == '${accountId}'`,
        table: 'notifications',
      });

      if (records) commit('setNotifications', records);
    },

    readNotifications({ commit, getters }) {
      const theNotifications = [...getters.getOutstandingNotifications];
      theNotifications.map((i) => (i.status = 'seen'));
      theNotifications.forEach((i) => {
        Db.update({ id: i.id, record: { ...i }, table: 'notifications' }, { showResult: false });
      });
      commit('readNotifications');
    },

    async createNotification({ commit }, { accountId, text, subject = 'Regular' }) {
      const record = {
        id: Date.now().toString(),
        date: Date.now().toString(),
        accountId,
        subject,
        text,
        status: 'outstanding',
      };
      const res = await Db.create(
        {
          record: { ...record },
          table: 'notifications',
        },
        { showResult: false },
      );
      if (res) commit('addNotification', { ...record });
    },

    async clearNotifications({ commit, getters }) {
      getters.getAllNotifications.forEach((i) => {
        Db.delete({ id: i.id.toString(), table: 'notifications' }, { showResult: false });
      });
      commit('clearNotifications');
    },
  },
};
