<template>
  <div class="login-choice beta">
    <q-btn
      size="lg"
      padding="md"
      class="label self-center"
      color="accent"
      @click="this.$router.push({name :'Login'})">
      Войти
    </q-btn>
    <q-btn
      size="lg"
      padding="md"
      class="label self-center"
      color="accent"
      @click="this.$router.push({name :'Register'})">Зарегестрироваться</q-btn>
  </div>

</template>

<script>
export default {
  name: 'Auth',
};
</script>

<style scoped>

</style>
