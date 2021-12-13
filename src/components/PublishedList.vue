<template>
  <q-list bordered separator v-if="events.length">

    <q-item
      v-ripple
      clickable
      @click="this.$router.push(`/${event.id}/see`)"
      :id="event.id"
      v-for="event in events"
      :key="event.id"
    >
      <q-item-section>
        <q-item-label>{{ event.name }}</q-item-label>
        <q-item-label caption>{{ event.city }}</q-item-label>
      </q-item-section>
      <q-item-section @click.stop="this.onDeleteEvent(event)"
                      style="flex: 10%; padding-right: 16px;">
        <q-icon name="clear" size="lg" color="red"></q-icon>
      </q-item-section>
      <q-item-section @click.stop="this.onRevokeEvent(event)"
                      style="flex: 10%; padding-right: 16px;">
        <q-icon name="cleaning_services" size="lg" color="grey"></q-icon>
      </q-item-section>

    </q-item>

  </q-list>

</template>

<script>
import { gsap } from 'gsap';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'PublishedList',
  props: {
    events: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getUserRole']),
  },
  methods: {
    ...mapActions(['unpublishEvent', 'deleteEventByAdmin']),
    async onDeleteEvent(event) {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите удалить мероприятие?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        iconColor: 'red',
      });

      if (ok) {
        const el = document.getElementById(event.id);
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 1,
          onComplete: async () => {
            await this.deleteEventByAdmin(event);
            gsap.to(el, {
              opacity: 1,
              height: 'auto',
            });
          },
        });
      }
    },

    async onRevokeEvent(event) {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите отправить мероприятие в черновик?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        iconColor: 'red',
      });

      if (ok) {
        const el = document.getElementById(event.id);
        gsap.to(el, {
          opacity: 0,
          height: 0,
          duration: 1,
          onComplete: async () => {
            await this.unpublishEvent(event);
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
