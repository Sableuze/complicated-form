<template>
  <div class="cnt">
    <div class="header">
      <h2 class="title">Уведомления</h2>
      <q-btn v-if="getAllNotifications.length"
             label="Очистить" color="red" @click="deleteNotifications"></q-btn>
    </div>
    <template v-if="getAllNotifications.length">
      <q-list bordered separator  style="flex: 3">
        <template v-for="item in paginatedNotifications" :key="item.date">
          <q-item v-ripple class="item" :class="item.status === 'outstanding' && 'bg-red-1'">
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
              <q-item-label caption>{{ item.subject || 'Глобальные' }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <showBeautifulDate :date="item.date"></showBeautifulDate>

            </q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-pagination
        v-if="pagesCount > 1"
        v-model="currentPage"
        color="teal"
        :max="pagesCount"
        :ellipses="false"
        :boundary-numbers="false"
      />
    </template>
    <template v-else>
      <h2 class="nothing self-center">Пока пусто...</h2>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { gsap } from 'gsap';
import showBeautifulDate from '@/components/showBeautifulDate.vue';

export default {
  name: 'Notifications',
  components: {
    showBeautifulDate,
  },
  beforeRouteLeave() {
    if (this.getOutstandingNotifications.length) this.readNotifications();
  },
  computed: {
    ...mapGetters(['getUser', 'getAllNotifications', 'getOutstandingNotifications']),

    paginatedNotifications() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.getAllNotifications.slice(start, end);
    },

    pagesCount() {
      return Math.ceil(this.getAllNotifications.length / this.perPage);
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      nextPage: null,
    };
  },

  methods: {
    ...mapActions(['readNotifications', 'clearNotifications']),
    async deleteNotifications() {
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите удалить все уведомления?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        iconColor: 'red',
      });

      if (ok) {
        const tl = gsap.timeline({ repeatDelay: 0.1 });
        document.querySelectorAll('.item').forEach((el) => {
          tl.to(el, {
            opacity: 0,
            height: 0,
            duration: 0.1,
          });
        });

        this.clearNotifications();
      }
    },

  },
};
</script>

<style scoped>
.cnt {
  height: 70vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 24px;
}
</style>
