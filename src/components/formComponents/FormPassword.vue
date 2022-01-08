<template>
  <q-input
    outlined
    spellcheck="false"
    :type="hidePassword ? 'password' : 'text' "
    no-error-icon
    :rules="[val => val.length > 0 || errorTypes.noPassword,
    val => val.length >= 8 || errorTypes.shortPassword,
    val => validatePassword(val) || errorTypes.wrongPassword]"
    >
    <template v-slot:append>
      <q-icon
        :name="hidePassword ? 'visibility' : 'visibility_off' "
        @click="hidePassword = !hidePassword"
      ></q-icon>
    </template>

  </q-input>
</template>

<script>
import { errorTypesAuth, errorTypesRegister } from '@/helpers/validation/errorTypes';
import { passwordPattern } from '@/helpers/validation/validatorPatterns';

export default {
  name: 'Password',
  props: {
    register: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.errorTypes = { ...errorTypesAuth, ...errorTypesRegister };
  },
  data() {
    return {
      errorTypes: '',
      hidePassword: true,

    };
  },
  methods: {
    validatePassword(val) {
      if (!this.register) return true;
      return passwordPattern.test(val);
    },
  },
};
</script>

<style scoped>

</style>
