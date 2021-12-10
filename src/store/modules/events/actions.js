import { successTypesPosts, successTypesDBRegular } from '@/helpers/successTypes';
import eventTypesPosts from '@/helpers/ablyEvents';
import Db from '@/api/databaseWrapper';
import { formatDates } from '@/helpers/reformatDatesHelper';
import { ably } from '@/api/eventService';

const channelMain = ably.channels.get('main');

export default {

  async publishEvent({ commit, getters }, eventId) { // for admin
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'published';
    const { ok } = await Db.update({
      id: theEvent.id,
      record: theEvent,
      table: 'events',
    }, { onSuccess: 'Мероприятие опубликовано' });
    if (ok) {
      commit('addEventToPublished', theEvent);
      commit('removeEventFromSuggested', eventId);
      channelMain.publish('mainFlow', { event: eventTypesPosts.e_published,
        accountId: getters.getUser.profile.accountId,
        text: 'Ваше мероприятие опубликовано' });
    }
  },

  async createEvent({ commit }, data) {
    const theEvent = { ...data };
    theEvent.dates = formatDates(data.dates);
    const { ok } = await Db.create({ record: theEvent, table: 'events' }, { onSuccess: successTypesDBRegular.createEvent });
    if (ok) {
      commit('addEventToDraft', data);
      return true;
    } commit('changeSuccessStatus', false);
  },

  async suggestEvent({ commit, getters }, eventId) {
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'suggested';
    const { ok } = await Db.update({
      id: theEvent.id,
      record: theEvent,
      table: 'events',
    }, { onSuccess: 'Отправлено на модерацию' });
    if (ok) {
      commit('addEventToSuggested', theEvent);
      commit('removeEventFromDraft', eventId);
      commit('changeSuccessStatus', true);
      debugger;
      channelMain.publish('mainFlow', { event: eventTypesPosts.e_suggested,
        accountId: getters.getUser.profile.accountId,
        text: 'Ваше мероприятие опубликовано' });
    }
  },

  async revokeEvent({ commit, getters }, eventId) {
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'draft';
    const ok = await Db.update({
      id: theEvent.id,
      record: theEvent,
      table: 'events',
    }, { onSuccess: 'Отозвано из модерации' });
    if (ok) {
      commit('removeEventFromSuggested', eventId);
      if (theEvent.creatorId === getters.getUser.accountId) commit('addEventToDraft', theEvent);
      channelMain.publish('mainFlow', { event: eventTypesPosts.e_revoked });
    }
  },

  unpublishEvent({ commit }, id) { // for admin
    commit('removeEventFromPublished', id);
  },

  async deleteEvent({ commit }, id) {
    const { ok } = await Db.delete({ id, table: 'events' }, { onSuccess: successTypesPosts.deleteEvent });
    if (ok) {
      commit('removeEventFromDraft', id);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);
  },
  async getMySuggestedEvents({ commit, getters }, { onSuccess }) {
    const { records } = await Db.read({ query: `status == 'suggested' and id == '${getters.getUser.accountId}'`, table: 'events' }, { onSuccess });
    commit('setSuggestedEvents', records);
  },
  async getAllSuggestedEvents({ commit }) {
    debugger;
    const { records } = await Db.read({ query: "status == 'suggested'", table: 'events' });
    commit('setSuggestedEvents', records);
  },

  async getMyDraftEvents({ commit, getters }) {
    const { records } = await Db.read({ query: `status == 'draft' and id == '${getters.getUser.accountId}'`, table: 'events' });
    commit('setDraftEvents', records);
  },
};
