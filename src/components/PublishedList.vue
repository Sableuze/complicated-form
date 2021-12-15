<template>
  <div>
    <q-list bordered separator v-if="events.length">

      <q-item
        v-ripple
        clickable
        @click="this.$router.push(`/${event.id}/see`)"
        v-for="event in events"
        :id="event.id"
        :key="event.id"
        class="flex justify-between"
      >
        <q-item-section>
          <q-item-label>{{ event.name }}</q-item-label>
          <q-item-label caption>{{ event.city }}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="role === 'admin'"
          class="icons-cnt">
          <q-icon
            name="clear"
            size="lg"
            color="red"
            @click.stop="this.onDeleteEvent(event)">

          </q-icon>
          <q-icon
            name="cleaning_services"
            size="lg"
            color="grey"
            @click.stop="this.onRevokeEvent(event)">

          </q-icon>

        </q-item-section>

      </q-item>

    </q-list>
    <Nothing-message :fz="24" v-else></Nothing-message>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { mapActions, mapGetters } from 'vuex';
import NothingMessage from '@/components/NothingMessage.vue';

export default {
  name: 'PublishedList',
  // props: {
  //   events: {
  //     type: Array,
  //     default() {
  //       return [];
  //     },
  //   },
  // },
  components: {
    NothingMessage,
  },
  created() {
    this.fetchAllPublishedEvents({ query: "status == 'published'", table: 'events' });
  },

  computed: {
    ...mapGetters({ role: 'getUserRole', isLoading: 'isLoading', events: 'getAllPublishedEvents' }),
  },
  methods: {
    ...mapActions(['unpublishEvent', 'deleteEventByAdmin', 'fetchAllPublishedEvents']),
    deleteEventFromLocal(id) {
      debugger;
      this.$emit('deleteFromLocal', id);
    },
    async onDeleteEvent(event) {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите удалить мероприятие?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        iconColor: 'red',
      });

      if (ok) {
        if (await this.deleteEventByAdmin(event)) {
          const el = document.getElementById(event.id);
          gsap.to(el, {
            opacity: 0,
            height: 0,
            duration: 1,
            onComplete: () => {
              // this.deleteEventFromLocal(event.id);
              gsap.to(el, {
                opacity: 1,
                height: 'auto',
              });
            },
          });
        }
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
        if (await this.unpublishEvent(event)) {
          const el = document.getElementById(event.id);
          gsap.to(el, {
            opacity: 0,
            height: 0,
            duration: 1,
            onComplete: () => {
              // this.deleteEventFromLocal(event.id);
              gsap.to(el, {
                opacity: 1,
                height: 'auto',
              });
            },
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.icons-cnt {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-direction: row;
  flex: 16%;

  > i {
    transition: all .4s;

    &:hover {
      transform: scale(1.2);
      border-radius: 50%;
    }
  }
}
</style>
