<template>
  <div class="moderate-cnt">
    <Alert-box :icon="'info'">
      <template v-slot:alert-text>
        Проверьте на наличие ошибок
      </template>
    </Alert-box>
    <Event-showcase :eventId="id"></Event-showcase>
    <div class="buttons">
      <q-btn
        outline
        :disable="getLoadingStatus"
        padding="md"
        class="btn label"
        @click="this.$router.back()"
      >Назад
      </q-btn>
      <q-btn
        filled
        :loading="getLoadingStatus"
        padding="md"
        class="btn label"
        color="accent"
        @click="onClick"
      >Опубликовать</q-btn>
    </div>
    <ActionResult :redirect="'back'" :show-text="false"></ActionResult>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertBox from '@/components/AlertBox.vue';
import EventShowcase from '@/components/EventShowcase.vue';
import ActionResult from '@/components/dialogComponents/ActionResult.vue';

export default {
  name: 'ModerateEvent',
  components: {
    AlertBox, EventShowcase, ActionResult,
  },

  mounted() {
    if (this.getEventStatus(this.id) !== 'suggested') this.$router.replace({ name: 'Home' });
  },
  computed: {
    ...mapGetters(['isLoading', 'getEventStatus']),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(['publishEvent']),

    onClick() {
      this.publishEvent(this.id);
    },
  },
};
</script>

<style scoped>
.moderate-cnt{
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.buttons{
  display: flex;
  justify-content: space-around;
}
</style>
