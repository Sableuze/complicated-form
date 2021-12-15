import { setItem } from '@/helpers/localStorageHelper';

export default {
  addEventToPublished(state, payload) {
    state.myEventsPublished.push(payload);
    setItem('myEventsPublished', state.myEventsPublished);
  },
  addEventToSuggested(state, payload) {
    state.myEventsSuggested.push(payload);
    setItem('myEventsSuggested', state.myEventsSuggested);
  },
  addEventToDraft(state, payload) {
    state.myEventsDraft.push(payload);
    setItem('myEventsDraft', state.myEventsDraft);
  },
  removeEventFromPublished(state, id) {
    state.myEventsPublished = state.myEventsPublished.filter((i) => i.id !== id);
    setItem('myEventsPublished', state.myEventsPublished);
  },
  removeEventFromSuggested(state, id) {
    state.myEventsSuggested = state.myEventsSuggested.filter((i) => i.id !== id);
    setItem('myEventsSuggested', state.myEventsSuggested);
  },
  removeEventFromDraft(state, id) {
    state.myEventsDraft = state.myEventsDraft.filter((i) => i.id !== id);
    setItem('myEventsDraft', state.myEventsDraft);
  },

  setMyDraftEvents(state, events) {
    state.myEventsDraft = events;
    setItem('myEventsDraft', state.myEventsDraft);
  },

  setMySuggestedEvents(state, events) {
    state.myEventsSuggested = events;
    setItem('myEventsSuggested', state.myEventsSuggested);
  },

  setMyPublishedEvents(state, events) {
    state.myEventsPublished = events;
    setItem('myEventsPublished', state.myEventsPublished);
  },

  setAllSuggestedEvents(state, events) {
    state.allSuggestedEvents = events;
  },

  setAllPublishedEvents(state, events) {
    state.allPublishedEvents = events;
  },

  filterAllSuggestedEvents(state, id) {
    state.allSuggestedEvents = state.allSuggestedEvents.filter((i) => i.id !== id);
  },

  filterAllPublishedEvents(state, id) {
    state.allPublishedEvents = state.allPublishedEvents.filter((i) => i.id !== id);
    state.myEventsPublished = state.myEventsSuggested.filter((i) => i.id !== id);
    setItem('myEventsPublished', state.myEventsPublished);
  },

  editEvent(state, { event, newData }) {
    event = newData;
    if (event.status === 'published') setItem('myEventsPublished', state.myEventsPublished);

    if (event.status === 'suggested') setItem('myEventsSuggested', state.myEventsSuggested);
    if (event.status === 'draft') setItem('myEventsDraft', state.myEventsDraft);
  },
};
