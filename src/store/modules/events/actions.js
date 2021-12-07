import Db from '@/api/databaseWrapper';
import { formatDates } from '@/helpers/reformatDatesHelper';

export default {
  publishEvent({ commit }, data) { // for admin
    data.id = this.getters.getLastPublishedId + 1;
    commit('addEventToPublished', data);
    // the same logic as below
  },

  async createEvent({ commit }, data) {
    commit('changeLoadingStatus', true);
    data.dates = formatDates(data.dates);
    const { status } = Db.create({ field: data, table: 'draft' });
    // eslint-disable-next-line no-constant-condition
    if (!status) {
      commit('addEventToDraft', data);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);

    commit('changeLoadingStatus', false);
  },

  async suggestEvent({ commit }, eventId) {
    commit('changeLoadingStatus', true);
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'suggested';
    const { status } = await Db.create({
      record: theEvent,
      table: 'suggested',
    });
    commit('changeLoadingStatus', false);

    if (!status) {
      Db.delete({ id: theEvent.id, table: 'draft' });
      commit('addEventToSuggested', theEvent);
      commit('removeEventFromDraft', eventId);
      commit('changeSuccessStatus', true);
    } else {
      commit('changeSuccessStatus', false);
      return status;
    }
  },

  revokeEvent({ commit }, eventId) {
    const theEvent = { ...this.getters.getEventById(eventId) };
    commit('removeEventFromSuggested', eventId);
    theEvent.status = 'draft';
    commit('addEventToDraft', theEvent);
  },

  unpublishEvent({ commit }, id) { // for admin
    commit('removeEventFromPublished', id);
  },

  deleteEvent({ commit }, id) {
    commit('changeLoadingStatus', true);
    // const res = await bla bla bla
    // eslint-disable-next-line no-constant-condition
    if (true) {
      commit('removeEventFromDraft', id);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);
    commit('changeLoadingStatus', false);
  },

  getMySuggestedEvents() {},
  async getAllSuggestedEvents() {
    const { records } = await Db.read({ table: 'suggested' });
    console.log(records);
  },
};
