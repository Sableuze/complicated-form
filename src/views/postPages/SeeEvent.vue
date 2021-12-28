<template>
  <div class="moderate-cnt" v-cloak>
    <Alert-box :icon="'info'">
      <template v-slot:alert-text>
        Внимательно изучите мероприятие
      </template>
    </Alert-box>
    <Event-showcase :eventId="id"></Event-showcase>
    <div class="buttons">
      <q-btn
        outline
        padding="md"
        class="btn label"
        @click="this.$router.push({name: 'Home'})"
      >Назад
      </q-btn>
    </div>
  </div>

</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import EventShowcase from '@/components/EventShowcase.vue';

export default {
  name: 'SeeEvent',
  components: {
    AlertBox, EventShowcase,
  },
  computed: {
    id() {
      return this.$route.params.id;
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
</style>
