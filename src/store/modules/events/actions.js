import { successTypesPosts, successTypesDBRegular } from '@/helpers/successTypes';
import { eventTypesPosts, subjectTitles, textTypesEvents } from '@/helpers/ablyEvents';
import Db from '@/api/databaseWrapper';
import { formatDates } from '@/helpers/reformatDatesHelper';
import { ably } from '@/api/eventService';

const cloneDeep = require('lodash.clonedeep');

const channelMain = ably.channels.get('main');

export default {

  async publishEvent({ commit, dispatch }, eventId) { // for admin
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
      dispatch('createNotification', { accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `${textTypesEvents.published} '${theEvent.name}'` });
      channelMain.publish('mainFlow', { event: eventTypesPosts.e_published,
        accountId: theEvent.creatorId,
        text: 'Ваше мероприятие опубликовано' });
    }
  },

  async createEvent({ commit }, data) {
    const theEvent = cloneDeep(data);
    theEvent.dates = formatDates(theEvent.dates);
    const { ok } = await Db.create({ record: theEvent, table: 'events' }, { onSuccess: successTypesDBRegular.createEvent });
    if (ok) {
      commit('addEventToDraft', theEvent);

      return true;
    } commit('changeSuccessStatus', false);
  },

  async suggestEvent({ commit }, eventId) {
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
      channelMain.publish('mainFlow', { event: eventTypesPosts.e_published,
        accountId: theEvent.creatorId,
      });
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

  async unpublishEvent({ dispatch }, theEvent) { // for admin
    theEvent.status = 'draft';
    const ok = await Db.update({
      id: theEvent.id,
      record: theEvent,
      table: 'events',
    }, { onSuccess: 'Отправлено в черновик пользователя' });
    if (ok) {
      dispatch('createNotification', { accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `${textTypesEvents.revokedFromPublished} '${theEvent.name}'` });

      channelMain.publish('mainFlow', { event: eventTypesPosts.e_revokedFromPublished,
        accountId: theEvent.creatorId,
        text: textTypesEvents.revokedFromPublished });
    }
  },

  async deleteEventByAdmin({ dispatch }, theEvent) {
    const { ok } = await Db.delete({ id: theEvent.id.toString(), table: 'events' }, { onSuccess: successTypesPosts.deleteEvent });
    if (ok) {
      dispatch('createNotification', { accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `Ваше мероприятие удалил АДМИН! '${theEvent.name}'` });

      channelMain.publish('mainFlow', { event: eventTypesPosts.e_deletedByAdmin,
        accountId: theEvent.creatorId,
        text: 'АДМИН ПИД**АС' });
    }
  },

  async deleteEvent({ commit }, id) {
    const { ok } = await Db.delete({ id: id.toString(), table: 'events' }, { onSuccess: successTypesPosts.deleteEvent });
    if (ok) {
      commit('removeEventFromDraft', id);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);
  },
  async getMySuggestedEvents({ commit, getters }) {
    const { records } = await Db.read({ query: `status == 'suggested' and creatorId == "${getters.getUser.accountId}"`, table: 'events' },
      { });
    commit('setSuggestedEvents', records);
  },
  async getAllSuggestedEvents({ commit }) {
    const { records } = await Db.read({ query: "status == 'suggested'", table: 'events' });
    commit('setSuggestedEvents', records);
  },

  async getMyDraftEvents({ commit, getters }) {
    const { records } = await Db.read({ query: `status == 'draft' and id == '${getters.getUser.accountId}'`, table: 'events' });
    commit('setDraftEvents', records);
  },
};
