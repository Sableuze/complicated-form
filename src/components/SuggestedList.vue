<template>
  <div v-cloak>
    <q-list bordered separator v-if="eventsList.length">

      <q-item
        :clickable="userRole === 'admin'"
        v-ripple
        :id="event.id"
        v-for="event in eventsList"
        :key="event.id"
        @click="onClick(event.id)"
      >
        <q-item-section>
          <q-item-label>{{ event.name }}</q-item-label>
          <q-item-label caption>{{ event.city }}</q-item-label>
        </q-item-section>
        <q-item-section @click.stop="this.removeEvent(event.id)"
                        style="flex: 10%; padding-right: 16px;">
          <q-icon name="clear" size="lg" color="red"></q-icon>
        </q-item-section>
      </q-item>

    </q-list>
    <Nothing-message v-else></Nothing-message>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { gsap } from 'gsap';
import NothingMessage from '@/components/NothingMessage.vue';

export default {
  name: 'SuggestedList',
  components: {
    NothingMessage,
  },
  computed: {
    ...mapGetters({ eventsList: 'getSuggestedEvents', userRole: 'getUserRole' }),
  },
  methods: {
    ...mapActions(['revokeEvent']),
    async removeEvent(id) {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите отозвать мероприятие?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        iconColor: 'red',
      });

      if (ok) {
        const el = document.getElementById(id);
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 1,
          onComplete: async () => {
            await this.revokeEvent(id);
            gsap.to(el, {
              opacity: 1,
              height: 'auto',
            });
          },
        });
      }
    },

    onClick(eventId) {
      if (this.getUserRole === 'admin') this.$router.push((`/${eventId}/moderate`));
    },

  },
};
</script>

<style scoped>

</style>
