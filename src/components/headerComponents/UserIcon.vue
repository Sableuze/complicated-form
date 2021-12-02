<template>
  <q-btn-dropdown flat round dense icon="person" v-if="dropdown">
    <div class="row no-wrap q-pa-md">

      <div class="column items-center">

        <div class="text-subtitle1 ">{{ getUser.username }}</div>
        <div class="text-subtitle2 q-mt-xs q-mb-xs">{{ theRole }}</div>
        <q-space></q-space>
        <div class="row q-mt-md q-gutter-xs">
          <Logout-button></Logout-button>
          <q-btn
            color="deep-orange-13"
            label="Редактировать профиль"
            unelevated
            size="sm"
            v-close-popup
            @click="$router.push({name:'EditUserInfo'})"
          />
        </div>
      </div>
    </div>
  </q-btn-dropdown>
  <q-img class="absolute-top" v-else
         src="https://cdn.quasar.dev/img/material.png" alt="''" style="height: 200px">
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="80px" class="q-mb-sm">
        <img :src="getUser?.profile?.picture || placeholder" class="img">
      </q-avatar>
      <div class="text-weight-bold username">{{ getUser.username }}</div>
      <div class="role">{{theRole}}</div>
      <div class="row q-mt-md q-gutter-xs">
        <Logout-button></Logout-button>

      </div>

    </div>
  </q-img>

</template>

<script>
import { mapGetters } from 'vuex';
import LogoutButton from '@/components/authComponents/LogoutButton.vue';
import placeholderSmall from '@/assets/placeholderSmall.png';

export default {
  name: 'UserIcon',
  props: {
    dropdown: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LogoutButton,
  },
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
    placeholder() {
      return placeholderSmall;
    },
  },
  data() {
    return {
      onlineStatus: true,
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.img{
  object-fit: cover;
}
.username{
}
</style>
