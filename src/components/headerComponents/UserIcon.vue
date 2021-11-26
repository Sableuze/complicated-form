<template>
  <q-btn-dropdown flat round dense icon="person">
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6 q-mb-md">Settings</div>
        <q-toggle v-model="onlineStatus" label="В сети"/>
      </div>

      <q-separator vertical inset class="q-mx-lg"/>

      <div class="column items-center">

        <div class="text-subtitle1 q-mt-md">{{'Гараев Равиль'}}</div>
        <div class="text-subtitle2 q-mt-xs q-mb-xs">{{theRole}}</div>
        <q-space></q-space>

        <q-btn
          color="primary"
          label="Выйти"
          push
          size="sm"
          v-close-popup
          @click="onLogout"
        />
      </div>
    </div>
  </q-btn-dropdown>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserIcon',
  computed: {
    ...mapGetters(['getUserRole']),
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
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Auth' });
    },
  },
};
</script>

<style scoped>

</style>
