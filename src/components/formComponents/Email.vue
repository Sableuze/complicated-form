<template>
  <q-input
    outlined
    no-error-icon
    type="email"
    placeholder="ivanov@mail.ru"
    :rules="[val => val.length > 0 || errorTypes.noEmail
         ,val => checkEmail(val) || errorTypes.wrongEmail]"
  ></q-input>

</template>

<script>
import { errorTypesMain } from '@/helpers/errorTypes';
import { emailPattern } from '@/helpers/validatorPatterns';

export default {
  name: 'Email',
  mounted() {
    this.errorTypes = errorTypesMain;
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
  },
};
</script>

<style scoped>

</style>
