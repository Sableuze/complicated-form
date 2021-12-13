<template>
  <div class="auth-cnt">
    <apiErrors :errorCodes="errors" :source="errorTypes"></apiErrors>
    <q-form @submit="onSubmit" class="form-auth">
      <Email v-model="email" :register="true"></Email>
      <Password v-model="password" :register="true"></Password>
      <Username v-model="username" :register="true"></Username>
      <AuthButtons></AuthButtons>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Email from '@/components/formComponents/Email.vue';
import Password from '@/components/formComponents/Password.vue';
import Username from '@/components/formComponents/Username.vue';
import apiErrors from '@/components/dialogComponents/apiErrors.vue';
import AuthButtons from '@/components/authComponents/AuthButtons.vue';

import { errorTypesRegister } from '@/helpers/errorTypes';

export default {
  name: 'Register',
  components: {
    Email, Password, Username, AuthButtons, apiErrors,
  },
  mounted() {
    this.errorTypes = errorTypesRegister;
  },

  data() {
    return {
      email: '',
      password: '',
      username: '',
      errors: [],
      errorTypes: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    async onSubmit() {
      const { status } = await this.register({
        email: this.email.trim(),
        username: this.username.trim(),
        password: this.password.trim(),
      });

      if (status) {
        if (status && this.errors.indexOf(status) === -1) this.errors.push(status);
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },

};
</script>

<style scoped>

</style>
