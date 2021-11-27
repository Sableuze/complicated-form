import { authentication } from './http';

// eslint-disable-next-line import/prefer-default-export
export default class Auth {
  static async register(email, password, username, id = 0) {
    const response = await authentication.post('user/Create', {
      email, password, username, id,
    });
    console.log(response);
  }

  static async login(email, password) {
    const response = await authentication.post('user/Login', { email, password });
    debugger;
    if (response) {
      return response;
    }
  }
}
