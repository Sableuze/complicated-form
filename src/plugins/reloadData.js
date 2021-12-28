// import startEventHandler from '@/helpers/eventHandler';

// eslint-disable-next-line import/prefer-default-export
export default (store) => () => {
  store.dispatch('fetchMyDraftEvents');
  store.dispatch('fetchMySuggestedEvents');
  store.dispatch('fetchMyPublishedEvents');
  store.dispatch('fetchNotifications');
};
