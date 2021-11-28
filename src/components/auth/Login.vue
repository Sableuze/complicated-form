<template>
  <apiErrors :errorCodes="errors" :source="errorTypes"></apiErrors>
  <q-form @submit="onSubmit" class="form-auth">
    <Email v-model="email"></Email>
    <Password v-model="password"></Password>
    <div class="buttons">
      <q-btn
        :disable="getLoadingStatus"
        outline
        padding="sm"
        size="lg"
        @click="$router.push({name: 'Auth'})"
      >Назад
      </q-btn>
      <q-btn
        :disable="getLoadingStatus"
        padding="sm"
        size="lg"
        type="submit"
        color="accent"
      >Продолжить
      </q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Email from '@/components/formComponents/Email.vue';
import Password from '@/components/formComponents/Password.vue';
import apiErrors from '@/components/apiErrors.vue';
import { errorTypesLogin } from '@/helpers/errorTypes';

export default {
  name: 'Login',
  components: {
    Email,
    Password,
    apiErrors,
  },
  mounted() {
    this.errorTypes = errorTypesLogin;
  },
  computed: {
    ...mapGetters(['getUser', 'getLoadingStatus']),
  },
  data() {
    return {
      email: '',
      password: '',

      errors: [],
      errorTypes: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      const status = await this.login({ login: this.email, password: this.password });
      if (status) {
        if (status && this.errors.indexOf(status)) this.errors.push(status);
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
.buttons {
  display: flex;
  gap: 16px;
}
</style>
