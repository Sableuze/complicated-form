<template>
  <div v-cloak>
    <q-list bordered separator v-if="eventsList.length">
      <q-item clickable v-ripple
              :id="event.id"
              v-for="event in eventsList" :key="event.id">
        <q-item-section @click="$router.push(`/${event.id}/suggest`)">
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
  name: 'DraftList',
  components: {
    NothingMessage,
  },
  computed: {
    ...mapGetters({ eventsList: 'getDraftEvents' }),
  },
  methods: {
    ...mapActions({ deleteEvent: 'deleteEvent' }),
    async removeEvent(id) {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Do you really want to delete the event and all its data?',
        okButton: 'YES',
        okColor: 'red',
        icon: 'remove',
        iconColor: 'red',
      });

      if (ok) {
        const el = document.getElementById(id);
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 1,
          onComplete: () => {
            this.deleteEvent(id);
            gsap.to(el, {
              opacity: 1,
              height: 'auto',
            });
          },
        });
      }
    },

  },
};
</script>

<style scoped>

</style>
