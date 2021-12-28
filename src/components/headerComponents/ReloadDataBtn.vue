<template>
  <q-btn icon="sync" :loading="isLoading" @click="onClick">

  </q-btn>
</template>

<script>
import { mapGetters } from 'vuex';
// import reload from '@/helpers/reloadData';

export default {
  name: 'ReloadDataBtn',
  inject: { reloadData: 'reloadData' },

  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    onClick() {
      this.reloadData();
    },
  },
};
</script>

<style scoped>

</style>
