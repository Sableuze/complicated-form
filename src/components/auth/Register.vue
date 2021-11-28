<template>
  <apiErrors :errorCodes="errors" :source="errorTypes"></apiErrors>
  <q-form @submit="onSubmit" class="form-auth">
    <Email v-model="email"></Email>
    <Password v-model="password"></Password>
    <q-input
      outlined
      no-error-icon
      placeholder="Ваня..."
      v-model="username"
    >

    </q-input>
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
import { errorTypesRegister } from '@/helpers/errorTypes';

export default {
  name: 'Register',
  components: {
    Email, Password, apiErrors,
  },
  mounted() {
    this.errorTypes = errorTypesRegister;
  },
  computed: {
    ...mapGetters(['getLoadingStatus']),
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
      const status = await this.register({ login: this.email,
        username: this.username,
        password: this.password });
      if (status) {
        if (status && this.errors.indexOf(status)) this.errors.push(status);
      }
    },
  },

};
</script>

<style scoped>

</style>
