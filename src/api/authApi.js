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

  static async sendPasswordResetEmail(email) {
    try {
      // eslint-disable-next-line no-unused-vars
      const emailDecoded = btoa(email);
      await authentication.post('/SendPasswordResetEmail', {
        email,
        fromName: 'Redbox',
        subject: 'Password reset',
        textContent: `Hi there,\n click here to reset your password:  http://localhost:8080/reset/?cd=$code&ml=${emailDecoded}`,
      });
      return true;
    } catch (err) {
      return err.response;
    }
  }

  static async resetPassword({ code, email, newPassword, confirmPassword }) {
    try {
      await authentication.post('/ResetPassword', {
        code, email, newPassword, confirmPassword,
      });
      return true;
    } catch (err) {
      return err.response;
    }
  }

  static async readSession(sessionId) {
    const response = await authentication.post('/readSession', { sessionId });
    return !!response;
  }

  static async readUserByUsername(username) {
    try {
      const { data } = await authentication.post('/Read', {
        username,
      });
      if (data) return data.account?.username;
    } catch (err) {
      return 'vacant';
    }
  }

  static async readUserByEmail(email) {
    try {
      const { data } = await authentication.post('/Read', {
        email,
      });
      if (data) return data.account.email;
    } catch (err) {
      return 'vacant';
    }
  }
}
