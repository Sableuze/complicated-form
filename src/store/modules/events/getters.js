export default {
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
