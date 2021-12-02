<template>
  <q-btn
    :color="color"
    label="Выйти"
    unelevated
    size="sm"
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
  },
  methods: {
    async onLogout() {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Do you really want to logout?',
        okButton: 'YES',
        okColor: 'red',
        icon: 'remove',
        iconColor: 'red',
      });
      if (ok) {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'Auth' });
      }
    },

  },
};
</script>

<style scoped>

</style>
