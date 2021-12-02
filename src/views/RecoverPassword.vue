<template>
  <q-form @submit="onSubmit" class="mb-2" >
    <apiErrors :errorsCodes="errors" :errors="errors" v-if="errors"></apiErrors>
    <h2>Введите ваш E-Mail</h2>
    <Email v-model="email"></Email>
    <AuthButtons></AuthButtons>
  </q-form>
  <div class="result">
    <p v-if="success === true" class="success">
      Сообщение успешно отправлено, проверьте вашу почту
    </p>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Email from '@/components/formComponents/Email.vue';
import Auth from '@/api/authApi';
import apiErrors from '@/components/apiErrors.vue';
import AuthButtons from '@/components/authComponents/AuthButtons.vue';

import { errorTypesSendResetMessage } from '@/helpers/errorTypes';

export default {
  name: 'RecoverPassword',
  components: {
    Email, apiErrors, AuthButtons,
  },
  mounted() {
    gsap.fromTo('.result', { opacity: 0 }, { opacity: 1, duration: 0.4 });
    this.errorTypes = errorTypesSendResetMessage;
  },
  data() {
    return {
      email: '',
      success: null,
      errors: [],
      errorTypes: {},
    };
  },
  methods: {
    async onSubmit() {
      const { status } = await Auth.sendPasswordResetEmail(this.email);
      if (!status) {
        this.success = true;
      } else if (status && this.errors.indexOf(status)) this.errors.push(status);
    },
  },
};
</script>

<style scoped>

</style>
