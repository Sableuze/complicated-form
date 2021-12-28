import initState from './state';
import getters from './getters';
import mutations from './mutations';
import initActions from './actions';

export default (Db, channel) => ({
  state: initState(),
  getters,
  mutations,
  actions: initActions(Db, channel),
});
