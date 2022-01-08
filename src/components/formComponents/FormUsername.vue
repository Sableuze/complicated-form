<template>
  <q-input
    outlined
    no-error-icon
    debounce="500"
    placeholder="Ваня..."
    :rules="[
      (val) => val.length > 0 || errorTypes.noUsername,
      (val) => val.length < 10 || errorTypes.tooLongUsername,
      (val) => readUsername(val.toLowerCase()),
    ]"
  >
  </q-input>
</template>

<script>
import { mapActions } from 'vuex';
import { errorTypesAuth, errorTypesRegister } from '@/helpers/validation/errorTypes';
import { usernamePattern } from '@/helpers/validation/validatorPatterns';

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
    ...mapActions(['checkUsername']),
    validateUsername(val) {
      return usernamePattern.test(val);
    },
    async readUsername(username) {
      if (!this.register) return true;
      const res = await this.checkUsername(username);
      return res !== username || this.errorTypes.takenUsername;
    },
  },
};
</script>

<style scoped></style>
