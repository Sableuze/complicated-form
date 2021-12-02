import { setItem, getItem } from '@/helpers/localStorageHelper';
import { formatDates } from '@/helpers/reformatDatesHelper';
import Db from '@/api/databaseWrapper';

const state = {
  eventsPublished: getItem('eventsPublished') || [],
  eventsSuggested: getItem('eventsSuggested') || [],
  eventsDraft: getItem('eventsDraft') || [],
};

const getters = {
  getLastEventId: (state) => Math.max(0, ...state.eventsPublished.map((i) => i.id),
    ...state.eventsSuggested.map((i) => i.id),
    ...state.eventsDraft.map((i) => i.id)),

  getPublishedEvents: (state) => state.eventsPublished,
  getSuggestedEvents: (state) => state.eventsSuggested,
  getDraftEvents: (state) => state.eventsDraft,

  getEventById: (state) => (id) => state.eventsPublished.find((i) => i.id === id)
    || state.eventsSuggested.find((i) => i.id === id)
    || state.eventsDraft.find((i) => i.id === id),
};

const mutations = {
  addEventToPublished(state, payload) {
    state.eventsPublished.push(payload);
    setItem('eventsPublished', state.eventsPublished);
  },
  addEventToSuggested(state, payload) {
    state.eventsSuggested.push(payload);
    setItem('eventsSuggested', state.eventsSuggested);
  },
  addEventToDraft(state, payload) {
    state.eventsDraft.push(payload);
    setItem('eventsDraft', state.eventsDraft);
  },
  removeEventFromPublished(state, id) {
    state.eventsPublished = state.eventsPublished.filter((i) => i.id !== id);
    setItem('eventsPublished', state.eventsPublished);
  },
  removeEventFromSuggested(state, id) {
    state.eventsSuggested = state.eventsSuggested.filter((i) => i.id !== id);
    setItem('eventsSuggested', state.eventsSuggested);
  },
  removeEventFromDraft(state, id) {
    state.eventsDraft = state.eventsDraft.filter((i) => i.id !== id);
    setItem('eventsDraft', state.eventsDraft);
  },

  editEvent(state, { event, newData }) {
    event = newData;
    if (event.status === 'published') setItem('eventsPublished', state.eventsPublished);

    if (event.status === 'suggested') setItem('eventsSuggested', state.eventsSuggested);
    if (event.status === 'draft') setItem('eventsDraft', state.eventsDraft);
  },
};
const actions = {
  publishEvent({ commit }, data) { // for admin
    data.id = this.getters.getLastPublishedId + 1;
    commit('addEventToPublished', data);
    // the same logic as below
  },
  suggestEvent({ commit }, eventId) {
    commit('changeLoadingStatus', true);
    const theEvent = { ...this.getters.getEventById(eventId) };
    theEvent.status = 'suggested';
    debugger;
    // await bla bla bla......
    // eslint-disable-next-line no-constant-condition
    if (true) {
      commit('addEventToSuggested', theEvent);
      commit('removeEventFromDraft', eventId);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);

    commit('changeLoadingStatus', false);
  },

  async createEvent({ commit }, data) {
    commit('changeLoadingStatus', true);
    data.dates = formatDates(data.dates);
    Db.create({ field: data, table: 'events' });
    // eslint-disable-next-line no-constant-condition
    if (true) {
      commit('addEventToDraft', data);
      commit('changeSuccessStatus', true);
    } else commit('changeSuccessStatus', false);

    commit('changeLoadingStatus', false);
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

  // getSuggestedEventsApi
  // getPublishedEventsApi
};

export default {
  state,
  getters,
  mutations,
  actions,
};
