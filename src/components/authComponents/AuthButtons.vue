<template>
  <div class="buttons">
    <q-btn
      :disable="loadingStatus"
      outline
      padding="sm"
      size="lg"
      @click="$router.push({name: 'Auth'})"
    >Назад
    </q-btn>
    <q-btn
      :loading="loadingStatus"
      padding="sm"
      size="lg"
      type="submit"
      color="accent"
    >Продолжить
    </q-btn>
  </div>

</template>

<script>
export default {
  name: 'AuthButtons',
  computed: {
    loadingStatus() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 8px;
  display: flex;
  gap: 16px;

}
</style>
