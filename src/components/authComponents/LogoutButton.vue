<template>
  <q-btn
    :color="color"
    :disable="this.$store.getters.isLoading"
    label="Выйти"
    unelevated
    :size="size"
    v-close-popup
    @click="onLogout"
  />
</template>

<script>
export default {
  name: 'LogoutButton',
  props: {
    color: {
      type: String,
      default: 'indigo-10',
    },
    size: {
      type: String,
      default: 'sm',
    },
  },
  methods: {
    async onLogout() {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите выйти?',
        okButton: 'YES',
        okColor: 'red',
        icon: 'remove',
        iconColor: 'red',
      });
      if (ok) {
        this.$store.dispatch('logout');
        this.$router.replace({ name: 'Auth' });
      }
    },

  },
};
</script>

<style scoped>

</style>
