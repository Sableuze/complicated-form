<template>
  <q-form @submit="onSubmit">
    <Email v-model="email"></Email>
    <Password v-model="password"></Password>
    <div class="buttons">
      <q-btn
      outline
      padding="md"
      size="lg"
      @click="$router.push({name: 'Auth'})"
      >Назад</q-btn>
      <q-btn
      padding="md"
      size="lg"
      type="submit"
      >Продолжить</q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';
import Email from '@/components/formComponents/Email.vue';
import Password from '@/components/formComponents/Password.vue';

export default {
  name: 'Login',
  components: {
    Email,
    Password,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      this.login({ login: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>

</style>
