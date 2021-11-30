<template>
  <q-btn-dropdown flat round dense icon="person">
    <div class="row no-wrap q-pa-md">

      <div class="column items-center">

        <div class="text-subtitle1 ">{{ getUser.username }}</div>
        <div class="text-subtitle2 q-mt-xs q-mb-xs">{{ theRole }}</div>
        <q-space></q-space>
        <div class="row q-mt-md q-gutter-xs">
          <q-btn
            color="primary"
            label="Выйти"
            push
            size="sm"
            v-close-popup
            @click="onLogout"
          />
          <q-btn
            color="accent"
            label="Открыть профиль"
            push
            size="sm"
            v-close-popup
            @click="onLogout"
          />
        </div>
      </div>
    </div>
  </q-btn-dropdown>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserIcon',
  computed: {
    ...mapGetters(['getUserRole', 'getUser']),
    theRole() {
      switch (this.getUserRole) {
        case 'moder': {
          return 'Модератор';
        }
        default: {
          return 'Пользователь';
        }
      }
    },
  },
  data() {
    return {
      onlineStatus: true,
    };
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
