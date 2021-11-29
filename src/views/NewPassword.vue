<template>
  <q-form @submit="onSubmit">
    <p class="label">Введите новый пароль</p>
    <Password v-model="newPassword" class="mb-3" :register="true"></Password>
    <p class="label">Повторите пароль</p>
    <Password v-model="confirmPassword" class="mb-3"
              :rules="[val => val === newPassword || 'Пароли не совпадают']"></Password>
    <AuthButtons></AuthButtons>
  </q-form>
  <ActionResult
    :redirect="{name: 'Auth'}"
    :redirectOnFailure="false"
    :successText="'Пароль успешно изменен'"
  ></ActionResult>

</template>

<script>
import { mapActions } from 'vuex';
import Password from '@/components/formComponents/Password.vue';
import AuthButtons from '@/components/auth/AuthButtons.vue';
import Auth from '@/api/authApi';
import ActionResult from '@/components/ActionResult.vue';

export default {
  name: 'NewPassword',
  components: {
    Password, AuthButtons, ActionResult,
  },

  data() {
    return {
      code: this.$route.query.cd,
      email: atob(this.$route.query.ml),
      newPassword: '',
      confirmPassword: '',

      success: null,
      errors: [],
    };
  },
  methods: {
    ...mapActions(['changeSuccessStatus']),
    async onSubmit() {
      const { status } = await Auth.resetPassword({
        code: this.code,
        email: this.email,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });
      if (!status) {
        this.changeSuccessStatus(true);
      } else if (status && this.errors.indexOf(status)) {
        this.errors.push(status);
        this.changeSuccessStatus(false);
      }
    },
  },
};
</script>

<style scoped>

</style>
