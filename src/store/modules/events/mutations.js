import { setItem } from '@/helpers/localStorageHelper';

export default {
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
