<template>
  <q-input
    outlined
    spellcheck="false"
    no-error-icon
    type="email"
    placeholder="ivanov@mail.ru"
    debounce="500"
    :rules="[
      (val) => val.length > 0 || errorTypes.noEmail,
      (val) => validateEmail(val) || errorTypes.wrongEmail,
      (val) => readEmail(val),
    ]"
  >
  </q-input>
</template>

<script>
import { mapActions } from 'vuex';
import { errorTypesMain, errorTypesRegister } from '@/helpers/validation/errorTypes';
import { emailPattern } from '@/helpers/validation/validatorPatterns';

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
    ...mapActions(['checkEmail']),
    validateEmail(val) {
      return emailPattern.test(val);
    },
    async readEmail(email) {
      if (!this.register) return true;
      const res = await this.checkEmail(email);
      return res !== email || this.errorTypes.takenEmail;
    },
  },
};
</script>

<style scoped></style>
