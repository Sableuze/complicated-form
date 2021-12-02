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
import Db from '@/api/databaseWrapper';

export default {
  name: 'Auth',
  mounted() {
    Db.list();
    Db.read({ table: 'users' });
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.login-choice{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    display: grid;
  }
}

</style>
