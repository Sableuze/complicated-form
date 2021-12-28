<template>
  <div class="auth-cnt">
    <apiErrors :errorCodes="errors" :source="errorTypes"></apiErrors>
    <q-form @submit="onSubmit" class="form-auth">
      <Email v-model="email"></Email>
      <Password v-model="password"></Password>
      <AuthButtons></AuthButtons>
    </q-form>
    <router-link class="label recover-link" :to="{name: 'RecoverPassword'}">
      Забыли пароль?
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { useQuasar } from 'quasar';
import Email from '@/components/formComponents/FormEmail.vue';
import Password from '@/components/formComponents/FormPassword.vue';
import apiErrors from '@/components/dialogComponents/ApiErrors.vue';
import AuthButtons from '@/components/authComponents/AuthButtons.vue';

export default {
  name: 'Login',

  components: {
    Email,
    Password,
    apiErrors,
    AuthButtons,
  },
  mounted() {
    const $q = useQuasar();
    $q.notify('Message');
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  data() {
    return {
      email: '',
      password: '',

      errors: [],
      errorTypes: {},
    };
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      const status = await this.login({ login: this.email, password: this.password });
      if (status) {
        if (status && this.errors.indexOf(status) === -1) this.errors.push(status);
      }
    },
  },
  watch: {
    getUser: {
      handler() {
        this.$router.replace({ name: 'Home' });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.recover-link {
  display: block;
  text-decoration: none;
  margin-top: 12px;
}
</style>
