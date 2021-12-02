<template>
  <q-layout view="lHh Lpr lFf" class="q-ma-none" v-if="this.$store.getters.isLoggedIn">
    <q-header class="header">

      <q-toolbar>
        <q-btn flat round dense @click="drawer = !drawer" icon="menu" class="q-mr-sm"/>
        <q-space></q-space>
        <q-btn flat round dense icon="search" class="q-mr-xs"/>
<!--        <User-icon :dropdown="true" class="gt-sm"></User-icon>-->
      </q-toolbar>
    </q-header>
    <q-drawer
      overlay
      v-model="drawer"
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="height: 70%; margin-top: 200px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple :to="{name: 'Home'}">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Главная
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'CreateEvent'}">
            <q-item-section avatar>
              <q-icon name="add_circle" />
            </q-item-section>

            <q-item-section>
              Создать
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name: 'EditUserInfo'}">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Профиль
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <User-icon :dropdown="false"></User-icon>

    </q-drawer>

    <q-page-container class="q-ma-lg">
      <router-view></router-view>
    </q-page-container>
  </q-layout>

</template>

<script>
import UserIcon from '@/components/headerComponents/UserIcon.vue';

export default {
  name: 'LayoutDefault',
  components: {
    UserIcon,
  },
  computed: {
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped lang="scss">
.header{
  background: $deeper-green;
}
</style>
