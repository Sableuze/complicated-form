<template>
  <q-layout view="lHh Lpr lFf" class="q-ma-none" v-if="this.$store.getters.isLoggedIn">
    <q-header class="header">
      <q-toolbar>
        <q-btn flat round dense @click="drawer = !drawer" icon="menu" class="q-mr-sm"/>
        <Reload-data-btn></Reload-data-btn>
        <q-space></q-space>
        <q-btn flat round dense icon="search" class="q-mr-xs"/>
        <!--        <User-icon :dropdown="true" class="gt-sm"></User-icon>-->
      </q-toolbar>
    </q-header>
    <q-drawer
      overlay
      v-model="drawer"
      :width="300"
      :breakpoint="2000"
    >
      <q-scroll-area style="height: 70%; margin-top: 200px; border-right: 1px solid #ddd">
          <Menu-list></Menu-list>

      </q-scroll-area>
      <User-icon :dropdown="false"></User-icon>

    </q-drawer>

    <q-page-container class="q-ma-lg" >
      <router-view v-slot="{ Component }">
        <keep-alive :include="['Home', 'CreateEvent', 'ModerateList']">
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>

</template>

<script>
import { mapActions } from 'vuex';
import MenuList from '@/components/drawerComponents/MenuList.vue';
import UserIcon from '@/components/headerComponents/UserIcon.vue';
import startEventHandler from '@/helpers/eventHandler';
import ReloadDataBtn from '@/components/headerComponents/ReloadDataBtn.vue';

export default {
  name: 'LayoutDefault',
  components: {
    UserIcon, MenuList, ReloadDataBtn,
  },
  created() {
    this.fetchNotifications();
  },
  mounted() {
    startEventHandler();
  },
  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    ...mapActions(['fetchNotifications']),
  },

};
</script>

<style scoped lang="scss">
.header {
  background: $deeper-green;
}

</style>
