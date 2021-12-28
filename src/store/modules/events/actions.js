import { successTypesPosts } from '@/helpers/successTypes';
import { eventTypesPosts, subjectTitles, textTypesEvents } from '@/helpers/ablyEvents';
import { formatDates } from '@/helpers/reformatDatesHelper';

const cloneDeep = require('lodash.clonedeep');

export default (Db, channel) => ({
  async createEvent({ commit }, data) {
    const theEvent = cloneDeep(data);
    theEvent.dates = formatDates(theEvent.dates);
    const { ok } = await Db.create(
      { record: theEvent, table: 'events' },
      { onSuccess: successTypesPosts.onCreateEvent },
    );
    if (ok) {
      commit('addEventToDraft', theEvent);
      commit('changeSuccessStatus', true);
      return true;
    }
    commit('changeSuccessStatus', false);
  },

  async suggestEvent({ commit }, eventId) {
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'suggested';
    const { ok } = await Db.update(
      {
        id: theEvent.id,
        record: theEvent,
        table: 'events',
      },
      { onSuccess: successTypesPosts.onSuggestEvent },
    );
    if (ok) {
      commit('addEventToSuggested', theEvent);
      commit('removeEventFromDraft', eventId);
      commit('changeSuccessStatus', true);
    }
  },

  async revokeMyEvent({ commit }, eventId) {
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'draft';
    const ok = await Db.update(
      {
        id: theEvent.id,
        record: theEvent,
        table: 'events',
      },
      { onSuccess: successTypesPosts.onRevokeEvent },
    );
    if (ok) {
      commit('removeEventFromSuggested', eventId);
      commit('addEventToDraft', theEvent);
    }
  },

  async deleteMyEvent({ commit }, id) {
    const { ok } = await Db.delete(
      { id: id.toString(), table: 'events' },
      { onSuccess: successTypesPosts.onDeleteEvent },
    );
    if (ok) {
      commit('removeEventFromDraft', id);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);
  },

  async fetchMyDraftEvents({ commit, getters }) {
    const { records } = await Db.read({
      query: `status == 'draft' and creatorId == "${getters.getUser.accountId}"`,
      table: 'events',
    }, {});
    commit('setMyDraftEvents', records);
  },

  async fetchMySuggestedEvents({ commit, getters }) {
    const { records } = await Db.read(
      {
        query: `status == 'suggested' and creatorId == "${getters.getUser.accountId}"`,
        table: 'events',
      },
      {},
    );
    commit('setMySuggestedEvents', records);
  },

  async fetchMyPublishedEvents({ commit, getters }) {
    const { records } = await Db.read(
      {
        query: `status == 'published' and creatorId == "${getters.getUser.accountId}"`,
        table: 'events',
      },
      {},
    );
    commit('setMyPublishedEvents', records);
  },

  async fetchAllPublishedEvents({ commit }, { query = "status == 'published'" }) {
    const { records } = await Db.read({ query, table: 'events' }, {});
    if (records) {
      commit('setAllPublishedEvents', records);
    }
  },

  // ================================================= ADMIN FUNCTIONS

  async publishEvent({ commit, dispatch }, eventId) {
    // for admin
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'published';
    const { ok } = await Db.update(
      {
        id: theEvent.id,
        record: theEvent,
        table: 'events',
      },
      { onSuccess: successTypesPosts.onPublishEvent },
    );
    dispatch('changeSuccessStatus', true);
    if (ok) {
      commit('addEventToPublished', theEvent);
      commit('removeEventFromSuggested', eventId);
      dispatch('createNotification', {
        accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `${textTypesEvents.published} '${theEvent.name}'`,
      });
      console.log(channel);
      channel.publish('mainFlow', {
        event: eventTypesPosts.e_published,
        accountId: theEvent.creatorId,
        text: 'Ваше мероприятие опубликовано',
      });
    }
  },

  async declineEvent({ commit, dispatch }, theEvent) {
    theEvent.status = 'draft';
    const ok = await Db.update(
      {
        id: theEvent.id,
        record: theEvent,
        table: 'events',
      },
      { onSuccess: successTypesPosts.onDeclineEvent },
    );
    if (ok) {
      dispatch('createNotification', {
        accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `${textTypesEvents.declined} '${theEvent.name}'`,
      });
      commit('filterAllSuggestedEvents', theEvent.id);

      channel.publish('mainFlow', {
        event: eventTypesPosts.e_declined,
        accountId: theEvent.creatorId,
        text: textTypesEvents.declined,
      });
    }
  },

  async unpublishEvent({ dispatch }, theEvent) {
    // for admin
    theEvent.status = 'draft';
    const ok = await Db.update(
      {
        id: theEvent.id,
        record: theEvent,
        table: 'events',
      },
      { onSuccess: 'Отправлено в черновик пользователя' },
    );
    if (ok) {
      dispatch('createNotification', {
        accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `${textTypesEvents.unpublishedByAdmin} '${theEvent.name}'`,
      });

      channel.publish('mainFlow', {
        event: eventTypesPosts.e_unpublishedByAdmin,
        accountId: theEvent.creatorId,
        eventId: theEvent.id,
        text: textTypesEvents.unpublishedByAdmin,
      });
      return true;
    }
  },

  async deleteEventByAdmin({ dispatch }, theEvent) {
    const { ok } = await Db.delete(
      { id: theEvent.id.toString(), table: 'events' },
      { onSuccess: successTypesPosts.deleteEvent },
    );
    if (ok) {
      dispatch('createNotification', {
        accountId: theEvent.creatorId,
        subject: subjectTitles.events,
        text: `Ваше мероприятие удалил АДМИН! '${theEvent.name}'`,
      });

      channel.publish('mainFlow', {
        event: eventTypesPosts.e_deletedByAdmin,
        accountId: theEvent.creatorId,
        text: '',
      });
      return true;
    }
  },

  async fetchAllSuggestedEvents({ commit }) {
    const { records } = await Db.read({ query: "status == 'suggested'", table: 'events' }, {});
    commit('setAllSuggestedEvents', records);
  },
});
