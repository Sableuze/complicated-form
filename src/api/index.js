// import { Notify } from 'quasar';
// ably
import createRatingApi from './ratingService';
import createAddressApi from './addressService';
import createAuthApi from './authService';
import createDbApi from './databaseService';

import { errorTypesAuthApi, errorTypesDB } from '@/helpers/errorTypes';
import { successTypesUser, successTypesDBRegular } from '@/helpers/successTypes';

export default (redbox, dadata, authentication, database) => ({
  rating: createRatingApi(redbox),
  address: createAddressApi(dadata),
  auth: createAuthApi(authentication, errorTypesAuthApi, successTypesUser),
  database: createDbApi(database, errorTypesDB, successTypesDBRegular),

  // wSocket: createNewSocket(ably, eventTypesPosts, textTypesEvents),
});

// export const initNewEventHandler = (store) => ({
//
// });
