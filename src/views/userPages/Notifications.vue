<template>
  <q-list bordered separator>

    <q-item v-ripple>
      <q-item-section>
        <q-item-label>Item with caption</q-item-label>
        <q-item-label caption>Caption</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
  <q-input v-model="msg"></q-input>
  <q-btn
    @click="post"
  label="Отправить"
  ></q-btn>
  <q-btn label="Получить" @click="consume"></q-btn>
  <q-btn label="connect" @click="connectt"></q-btn>
</template>

<script>
import { mapGetters } from 'vuex';
import { send } from '@/api/eventService';
import startEventHandler from '@/helpers/eventHandler';

export default {
  name: 'Notifications',
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    post() {
      if (this.msg) send(this.msg);
      this.msg = '';
    },
    consume() {
    },
    connectt() {
      startEventHandler();
    },
  },
  data() {
    return {
      msg: '',
    };
  },
};
</script>

<style scoped>

</style>
