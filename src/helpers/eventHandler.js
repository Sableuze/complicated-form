import { Notify } from 'quasar';
import eventTypesPosts from '@/helpers/ablyEvents';
import { ably } from '@/api/eventService';
import store from '@/store';

const getEvents = (accountId) => {
  if (store.getters.getUserRole === 'admin') store.dispatch('getAllSuggestedEvents');

  else if (store.getters.getUser.accountId === accountId) store.dispatch('getMySuggestedEvents');
};
const isItMe = (accountId) => {
  console.log(store.getters.getUser.accountId, accountId,
    store.getters.getUser.accountId === accountId);
  debugger;
  return store.getters.getUser.accountId === accountId;
};

export default function startEventHandler() {
  const channelMain = ably.channels.get('main');
  const channelPersonal = ably.channels.get(store.getters.getUser.accountId);
  console.log(store.getters.getUser.accountId);

  channelMain.subscribe('mainFlow', async (msg) => {
    switch (msg.data.event) {
      case eventTypesPosts.e_suggested: {
        getEvents(msg.data.accountId);
        break;
      }
      case eventTypesPosts.e_published: {
        getEvents(msg.data.accountId);
        await store.dispatch('createNotification', msg.data);
        console.log(store.getters.getUser.accountId);
        if (isItMe(msg.data.accountId)) {
          debugger;
          store.dispatch('getMySuggestedEvents');
          Notify.create({
            message: 'Ваше мероприятие было одобрено модератором',
            type: 'positive',
            position: 'top-right',
          });
          // channelPersonal.publish('personalFlow', { event: eventTypesPosts.e_published, text: msg.data.text });
        }
        break;
      }
      case eventTypesPosts.e_rejected: {
        getEvents(msg.data.accountId);
        store.dispatch('createNotification', msg.data);

        if (isItMe(msg.data.accountId)) {
          Notify.create({
            message: msg.data.text,
            type: 'negative',
            position: 'top-right',
          });
        }
        break;
      }

      case eventTypesPosts.e_revoked: {
        getEvents(msg.data.accountId);
        break;
      }
      default: {
        return false;
      }
    }
  });

  channelPersonal.subscribe('personalFlow', async (msg) => {
    debugger;
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
