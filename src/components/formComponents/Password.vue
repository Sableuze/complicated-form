<template>
  <q-input
    outlined
    no-error-icon
    :rules="[val => val.length > 0 || errorTypes.noPassword,
    val => val.length > 8 || errorTypes.shortPassword]">
  </q-input>
<!--  val => validatePassword(val) || errorTypes.wrongPassword,-->
</template>

<script>
import { errorTypesAuth } from '@/helpers/errorTypes';
import { passwordPattern } from '@/helpers/validatorPatterns';

export default {
  name: 'Password',
  mounted() {
    this.errorTypes = errorTypesAuth;
  },
  data() {
    return {
      errorTypes: '',
    };
  },
  methods: {
    validatePassword(val) {
      return passwordPattern.test(val);
    },
  },
};
</script>

<style scoped>

</style>
