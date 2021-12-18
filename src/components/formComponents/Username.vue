<template>
  <q-input
    outlined
    no-error-icon
    debounce="500"
    placeholder="Ваня..."
    :rules="[val => val.length > 0 || errorTypes.noUsername,
    val => val.length < 10 || errorTypes.tooLongUsername,
    val => readUsername(val.toLowerCase())]"
  >

  </q-input>

</template>

<script>
import { errorTypesAuth, errorTypesRegister } from '@/helpers/errorTypes';
import { usernamePattern } from '@/helpers/validatorPatterns';
import Auth from '@/api/authApi';

export default {
  name: 'Username',
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
    };
  },
  methods: {
    checkUsername(val) {
      return usernamePattern.test(val);
    },
    async readUsername(val) {
      if (!this.register) return true;
      const res = await Auth.readUserByUsername(val);
      return res !== val || this.errorTypes.takenUsername;
    },
  },
};
</script>

<style scoped>

</style>
