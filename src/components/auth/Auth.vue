<template>
  <div class="login-choice beta">
    <q-btn
      outline
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
  methods: {
  },
};
</script>

<style scoped>
.login-choice{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

}

</style>
