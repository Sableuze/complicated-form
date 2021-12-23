import { authentication } from './http';
// eslint-disable-next-line import/prefer-default-export
import { errorTypesAuthApi } from '@/helpers/errorTypes';
import { successTypesUser } from '@/helpers/successTypes';

// const BACKEND_ENDPOINTS = {
//   register,
// };

export default class Auth {
  static async register({ email, username, password }) {
    const { data } = await authentication.post(
      '/Create',
      {
        email,
        password,
        username,
      },
      { onError: '404' },
    );
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
        textContent:
          'Hi there,\n\nPlease verify your email by clicking this link: $micro_verification_link',
      });
    } catch (err) {
      return err.response;
    }
  }

  static async login(email, password) {
    const { data } = await authentication.post(
      '/Login',
      { email, password },
      { showResult: true, onError: errorTypesAuthApi.wrongLoginOrPassword },
    );
    return data ? data.session : false;
  }

  static async logout(sessionId) {
    debugger;
    return authentication.post(
      '/Logout',
      { sessionId },
      { showResult: false, onSuccess: '', onError: '' },
    );
  }

  static async updateUserInfo({ id, data }) {
    return authentication.post(
      '/Update',
      { id, profile: { ...data } },
      {
        onSuccess: successTypesUser.updateUserInfo,
        onError: errorTypesAuthApi.updateUserInfo,
      },
    );
  }

  static async sendPasswordResetEmail(email) {
    // eslint-disable-next-line no-unused-vars
    const emailDecoded = btoa(email);
    const date = Date.now();
    return authentication.post(
      '/SendPasswordResetEmail',
      {
        email,
        fromName: 'Redbox',
        subject: 'Password reset',
        textContent: `Hi there,\n click here to reset your password:  http://localhost:8080/reset/?cd=$code&ml=${emailDecoded} \n
        ${new Date(date)}`,
      },
      { onSuccess: successTypesUser.sendResetEmail, onError: errorTypesAuthApi.sendResetEmail },
    );
  }

  static async resetPassword({ code, email, newPassword, confirmPassword }) {
    await authentication.post(
      '/ResetPassword',
      {
        code,
        email,
        newPassword,
        confirmPassword,
      },
      {
        onSuccess: successTypesUser.resetPassword,
        onError: errorTypesAuthApi.resetPassword,
      },
    );
  }

  static async readSession(sessionId) {
    const response = await authentication.post(
      '/readSession',
      { sessionId },
      { showResult: false },
    );
    return !!response;
  }

  static async readUserById(id) {
    const { data } = await authentication.post(
      '/Read',
      {
        id,
      },
      { onError: errorTypesAuthApi.readUserInfo },
    );
    return data ? data.account : false;
  }

  // for checking whether username or email is vacant
  static async readUserByUsername(username) {
    try {
      const { data } = await authentication.post(
        '/Read',
        {
          username,
        },
        { showResult: false },
      );
      if (data) return data.account?.username;
    } catch (err) {
      console.clear();
      return 'vacant';
    }
  }

  static async readUserByEmail(email) {
    try {
      const { data } = await authentication.post(
        '/Read',
        {
          email,
        },
        { showResult: false },
      );
      if (data) return data.account?.email;
    } catch (err) {
      console.clear();
      return 'vacant';
    }
  }
}
