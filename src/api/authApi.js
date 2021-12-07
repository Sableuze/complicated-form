import { authentication } from './http';
// eslint-disable-next-line import/prefer-default-export
import { errorTypesAuthApi } from '@/helpers/errorTypes';

export default class Auth {
  static async register({ email, username, password }) {
    const { data } = await authentication.post('/Create', {
      email, password, username },
    { vueAlert: '404' });
    return data.account;
  }

  static async sendVerificationEmail(email) {
    try {
      await authentication.post('/SendVerificationEmail', {
        email,
        failureRedirectUrl: 'http://localhost:8080/verification-failed',
        fromName: 'Awesome Dot Com',
        redirectUrl: 'http://localhost:8080',
        subject: 'Email verification',
        textContent: 'Hi there,\n\nPlease verify your email by clicking this link: $micro_verification_link',
      });
    } catch (err) {
      return err.response;
    }
  }

  static async login(email, password) {
    const { data } = await authentication.post('/Login', { email, password },
      { vueAlert: errorTypesAuthApi.wrongLoginOrPassword });
    return data ? data.session : false;
  }

  static async updateUserInfo({ id, data }) {
    return authentication.post('/Update2', {
      id,
      profile: { ...data } },
    { vueAlert: errorTypesAuthApi.updateUserInfo });
  }

  static async sendPasswordResetEmail(email) {
    // eslint-disable-next-line no-unused-vars
    const emailDecoded = btoa(email);
    const date = Date.now();
    return authentication.post('/SendPasswordResetEmail', {
      email,
      fromName: 'Redbox',
      subject: 'Password reset',
      textContent: `Hi there,\n click here to reset your password:  http://localhost:8080/reset/?cd=$code&ml=${emailDecoded} \n
        ${new Date(date)}`,
    }, { vueAlert: errorTypesAuthApi.sendResetEmail });
  }

  static async resetPassword({ code, email, newPassword, confirmPassword }) {
    await authentication.post('/ResetPassword', {
      code, email, newPassword, confirmPassword,
    }, { vueAlert: errorTypesAuthApi.resetPassword });
  }

  static async readSession(sessionId) {
    const response = await authentication.post('/readSession', { sessionId });
    return !!response;
  }

  static async readUserById(id) {
    const { data } = await authentication.post('/Read', {
      id,
    }, { vueAlert: errorTypesAuthApi.readUserInfo });
    return data ? data.account : false;
  }

  // for checking whether username or email is vacant
  static async readUserByUsername(username) {
    try {
      const { data } = await authentication.post('/Read', {
        username,
      });
      if (data) return data.account?.username;
      debugger;
    } catch (err) {
      console.clear();
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
      console.clear();
      return 'vacant';
    }
  }
}
