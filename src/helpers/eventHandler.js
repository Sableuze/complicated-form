import { Notify } from 'quasar';
import { eventTypesPosts, textTypesEvents } from '@/helpers/ablyEvents';
import { ably } from '@/api/eventService';
import store from '@/store';

const getSuggestedEvents = (accountId) => {
  if (store.getters.getUserRole === 'admin') store.dispatch('fetchAllSuggestedEvents');

  else if (store.getters.getAccountId === accountId) store.dispatch('fetchMySuggestedEvents');
};
const isItMe = (accountId) => store.getters.getAccountId === accountId;
const isAdmin = () => store.getters.getUserRole === 'admin';
export default function startEventHandler() {
  const channelMain = ably.channels.get('main');
  // const channelPersonal = ably.channels.get(store.getters.getAccountId);

  channelMain.subscribe('mainFlow', async (msg) => {
    const { accountId } = msg.data;

    switch (msg.data.event) {
      case eventTypesPosts.e_suggested: {
        if (isAdmin) getSuggestedEvents(msg.data.accountId);
        break;
      }
      case eventTypesPosts.e_published: {
        if (isAdmin) getSuggestedEvents(msg.data.accountId);
        store.dispatch('fetchAllPublishedEvents', {});
        if (isItMe(accountId)) {
          store.dispatch('fetchMyPublishedEvents');
          store.dispatch('fetchMySuggestedEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: 'Ваше мероприятие было одобрено модератором',
            type: 'positive',
            position: 'top-right',
          });
        }
        break;
      }
      case eventTypesPosts.e_unpublishedByAdmin: {
        store.commit('filterAllPublishedEvents', msg.data.eventId);
        if (isItMe(accountId)) {
          store.dispatch('fetchMyDraftEvents');
          store.dispatch('fetchMyPublishedEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: textTypesEvents.unpublishedByAdmin,
            type: 'negative',
            position: 'top-right',
          });
        }
        break;
      }
      case eventTypesPosts.e_deletedByAdmin: {
        store.commit('filterAllPublishedEvents', msg.data.eventId);

        if (isItMe(accountId)) {
          store.dispatch('fetchMyPublishedEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: textTypesEvents.deletedByAdmin,
            type: 'negative',
            position: 'top-right',
          });
        }
        break;
      }
      case eventTypesPosts.e_declined: {
        if (isAdmin()) getSuggestedEvents(accountId);

        if (isItMe(accountId)) {
          store.dispatch('fetchMyDraftEvents');
          store.dispatch('fetchMySuggestedEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: msg.data.text,
            type: 'negative',
            position: 'top-right',
          });
        }

        break;
      }

      case eventTypesPosts.e_revoked: {
        getSuggestedEvents(accountId);
        break;
      }
      default: {
        return false;
      }
    }
  });

  // channelPersonal.subscribe('personalFlow', async (msg) => {
  //   switch (msg.data.event) {
  //     case eventTypesPosts.e_published: {
  //       store.dispatch('getMySuggestedEvents');
  //       Notify.create({
  //         message: msg.data.text,
  //         type: 'positive',
  //         position: 'top-right',
  //       });
  //
  //       break;
  //     }
  //     case eventTypesPosts.e_rejected: {
  //       store.dispatch('getMySuggestedEvents');
  //       store.dispatch('getMyDraftEvents');
  //       break;
  //     }
  //     default: {
  //       return false;
  //     }
  //   }
  // });
}
