<template>
  <p class="choice">Зайти как :</p>
  <div class="buttons">
    <q-btn
      size="lg"
      padding="md"
      class="label self-center"
      color="accent"
      @click="this.$router.push({name: 'CreateEvent'})">
    </q-btn>
    <q-btn
      size="lg"
      padding="md"
      class="label self-center"
      color="accent"
      @click="this.$router.push({name: 'CreateEvent'})">
      Создать мероприятие
    </q-btn>

  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped>

</style>
