export default {
  getLastEventId: (state) => Math.max(0, ...state.myEventsPublished.map((i) => i.id),
    ...state.myEventsSuggested.map((i) => i.id),
    ...state.myEventsDraft.map((i) => i.id)),

  getPublishedEvents: (state) => state.myEventsPublished,
  getSuggestedEvents: (state) => state.myEventsSuggested,
  getDraftEvents: (state) => state.myEventsDraft,

  getAllSuggestedEvents: (state) => state.allSuggestedEvents,

  getAllPublishedEvents: (state) => state.allPublishedEvents,

  getSuggestedEventById: (state) => (id) => state.allSuggestedEvents.find((i) => i.id === id),

  getEventStatus: (state, getters) => (id) => getters.getEventById(id)?.status
    || getters.getSuggestedEventById(id)?.status,

  getEventById: (state) => (id) => state.myEventsPublished.find((i) => i.id === id)
    || state.myEventsSuggested.find((i) => i.id === id)
    || state.myEventsDraft.find((i) => i.id === id)
    || state.allSuggestedEvents.find((i) => i.id === id),
};
