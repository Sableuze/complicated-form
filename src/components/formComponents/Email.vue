<template>
  <q-input
    outlined
    no-error-icon
    type="email"
    placeholder="ivanov@mail.ru"
    debounce="300"
    :rules="[val => val.length > 0 || errorTypes.noEmail,
    val => checkEmail(val) || errorTypes.wrongEmail,
    val => readEmail(val)]"
  >

  </q-input>

</template>

<script>
import { errorTypesMain, errorTypesRegister } from '@/helpers/errorTypes';
import { emailPattern } from '@/helpers/validatorPatterns';
import Auth from '@/api/authApi';

export default {
  name: 'Email',
  props: {
    register: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.errorTypes = { ...errorTypesMain, ...errorTypesRegister };
  },
  data() {
    return {
      errorTypes: '',
    };
  },
  methods: {
    checkEmail(val) {
      return emailPattern.test(val);
    },
    async readEmail(val) {
      if (!this.register) return true;
      const res = await Auth.readUserByEmail(val);
      console.log(res);
      return res !== val || this.errorTypes.takenEmail;
    },
  },
};
</script>

<style scoped>

</style>
