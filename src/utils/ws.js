export default (Ably) => new Ably.Realtime(process.env.VUE_APP_ABLY_API_KEY);
