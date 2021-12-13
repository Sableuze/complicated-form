<template>
  <div class="suggest-cnt">
    <Alert-box :icon="'info'">
      <template v-slot:alert-text>
        Проверьте ваше мероприятие на наличие ошибок, если все в порядке - отправляйте на модерацию.
      </template>
    </Alert-box>
    <Event-showcase :eventId="id"></Event-showcase>
    <div class="buttons">
      <q-btn
        outline
        :disable="getLoadingStatus"
        padding="md"
        class="btn label"
        @click="this.$router.push({name: 'Home'})"
      >Назад
      </q-btn>
      <q-btn
        filled
        :loading="getLoadingStatus"
        padding="md"
        class="btn label"
        color="accent"
        @click="onSubmit"
      >Отправить на модерацию
      </q-btn>
    </div>
    <ActionResult :redirect="'/'" :show-text="false"></ActionResult>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertBox from '@/components/AlertBox.vue';
import EventShowcase from '@/components/EventShowcase.vue';
import ActionResult from '@/components/dialogComponents/ActionResult.vue';

export default {
  name: 'SuggestEvent',
  components: {
    AlertBox,
    EventShowcase,
    ActionResult,
  },
  computed: {
    ...mapGetters(['isLoading']),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(['suggestEvent']),
    onSubmit() {
      this.suggestEvent(this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.suggest-cnt {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
