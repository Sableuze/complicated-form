<template>
  <div class="container">
    <h2 class="login-title">Зайти как :</h2>
    <div class="login-choice">
      <q-btn
        size="lg"
        padding="md"
        class="label self-center"
        color="accent"
        @click="onLogin('moder')"
        >Модератор
      </q-btn>
      <q-btn
        size="lg"
        padding="md"
        class="label self-center"
        color="accent"
        @click="onLogin('user')"
        >Обычный пользователь
      </q-btn>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LayoutAuth',
  components: {},

  computed: {
    ...mapGetters(['getUserRole']),
  },

  methods: {
    ...mapActions(['login']),

    onLogin(role) {
      this.login(role);
      this.redirect();
    },

    redirect() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-title {
  font-size: 36px;
  font-weight: 900;
}

.login-choice {
  margin-top: 16px;
  display: flex;
  gap: 16px;
  justify-content: center;

  > div {
    font-size: 16px;
  }
}

</style>
