import store from '@/store';
import startEventHandler from '@/helpers/eventHandler';

const reload = () => {
  startEventHandler();
  store.dispatch('fetchMyDraftEvents');
  store.dispatch('fetchMySuggestedEvents');
  store.dispatch('fetchMyPublishedEvents');
  store.dispatch('fetchNotifications');
};
export default reload;
