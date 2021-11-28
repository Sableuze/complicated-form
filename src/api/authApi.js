import { authentication } from './http';

// eslint-disable-next-line import/prefer-default-export
export default class Auth {
  static async register(email, password, username) {
    try {
      const { data } = await authentication.post('/Create', {
        email, password, username,
      });
      debugger;
      return data.account;
    } catch (err) {
      return err.response;
    }
  }

  static async login(email, password) {
    try {
      const { data } = await authentication.post('/Login', { email, password });
      if (data) {
        return data.session;
      }
    } catch (err) {
      return err.response;
    }
  }

  static async readSession(sessionId) {
    const response = await authentication.post('/readSession', { sessionId });
    return !!response;
  }

  static async getUserInfo(userId) {
    const { data } = await authentication.post('/Read', {
      id: userId,
    });
    if (data) return data.account;
  }
}
