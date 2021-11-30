<template>
  <q-layout view="lHh Lpr lFf" class="q-ma-none">
    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm"/>
        <q-space></q-space>
        <q-btn flat round dense icon="search" class="q-mr-xs"/>
        <User-icon></User-icon>
      </q-toolbar>
    </q-header>
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
};
</script>

<style scoped>

</style>
