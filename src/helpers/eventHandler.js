import { Notify } from 'quasar';
import { eventTypesPosts } from '@/helpers/ablyEvents';
import { ably } from '@/api/eventService';
import store from '@/store';

const getEvents = (accountId) => {
  if (store.getters.getUserRole === 'admin') store.dispatch('getAllSuggestedEvents');

  else if (store.getters.getAccountId === accountId) store.dispatch('getMySuggestedEvents');
};
const isItMe = (accountId) => {
  console.log(store.getters.getAccountId, accountId,
    store.getters.getAccountId === accountId);

  return store.getters.getAccountId === accountId;
};

export default function startEventHandler() {
  const channelMain = ably.channels.get('main');
  const channelPersonal = ably.channels.get(store.getters.getAccountId);

  channelMain.subscribe('mainFlow', async (msg) => {
    const { accountId } = msg.data;

    switch (msg.data.event) {
      case eventTypesPosts.e_suggested: {
        getEvents(msg.data.accountId);
        break;
      }
      case eventTypesPosts.e_published: {
        getEvents(msg.data.accountId);
        if (isItMe(accountId)) {
          store.dispatch('getMySuggestedEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: 'Ваше мероприятие было одобрено модератором',
            type: 'positive',
            position: 'top-right',
          });
          // channelPersonal.publish('personalFlow',
          // { event: eventTypesPosts.e_published, text: msg.data.text });
        }
        break;
      }
      case eventTypesPosts.e_revokedFromPublished: {
        getEvents(msg.data.accountId);
        if (isItMe(accountId)) {
          store.dispatch('getMyDraftEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: eventTypesPosts.revokedFromPublished,
            type: 'negative',
            position: 'top-right',
          });
          // channelPersonal.publish('personalFlow',
          // { event: eventTypesPosts.e_published, text: msg.data.text });
        }
        break;
      }
      case eventTypesPosts.e_deletedByAdmin: {
        getEvents(msg.data.accountId);
        if (isItMe(accountId)) {
          store.dispatch('getMyDraftEvents');
          store.dispatch('fetchNotifications');
          Notify.create({
            message: eventTypesPosts.deletedByAdmin,
            type: 'negative',
            position: 'top-right',
          });
          // channelPersonal.publish('personalFlow',
          // { event: eventTypesPosts.e_published, text: msg.data.text });
        }
        break;
      }
      case eventTypesPosts.e_rejected: {
        getEvents(accountId);

        if (isItMe(accountId)) {
          store.dispatch('getMySuggestedEvents');
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
        getEvents(accountId);
        break;
      }
      default: {
        return false;
      }
    }
  });

  channelPersonal.subscribe('personalFlow', async (msg) => {
    switch (msg.data.event) {
      case eventTypesPosts.e_published: {
        store.dispatch('getMySuggestedEvents');
        Notify.create({
          message: msg.data.text,
          type: 'positive',
          position: 'top-right',
        });

        break;
      }
      case eventTypesPosts.e_rejected: {
        store.dispatch('getMySuggestedEvents');
        store.dispatch('getMyDraftEvents');
        break;
      }
      default: {
        return false;
      }
    }
  });
}
