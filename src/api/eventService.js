import Ably from 'ably/callbacks';
import eventTypesPosts from '@/helpers/ablyEvents';
// import store from   '@/store';
export const ably = new Ably.Realtime(process.env.VUE_APP_ABLY_API_KEY);
// export const connect = () => {
//   const channelPosts = ably.channels.get('posts');
//   channelPosts.subscribe(ablyEvents.e_suggested, (message) => {
//     console.log(message);
//     console.log(`Received a greeting message in realtime: ${message.data}`);
//   });
// };

export const send = (msg) => {
  const channel = ably.channels.get('main');

  channel.publish('mainFlow', { event: eventTypesPosts.e_published, text: msg });
};
