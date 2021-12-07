import { getItem } from '@/helpers/localStorageHelper';

export default {
  eventsPublished: getItem('eventsPublished') || [],
  eventsSuggested: getItem('eventsSuggested') || [],
  eventsDraft: getItem('eventsDraft') || [],
};
