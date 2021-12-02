<template>
  <div class="cnt flex column items-center">
    <h2 class="logo">RedBox</h2>
    <div class="q-ma-lg auth-wrapper">
      <router-view></router-view>
    </div>
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

<style lang="scss">

.login-title {
  font-size: 36px;
  font-weight: 900;
}

.cnt {
  gap: 24px;

  .logo {
    font-size: 92px;
    margin-bottom: 24px;
    font-weight: 900;
    color: $title-color;
    @media (max-width: 650px) {
      font-size: 40px;
    }
  }

  .auth-cnt {
    @media (min-width: 650px) {
      padding: 60px 96px;
      border: 1px solid rgba(0, 0, 0, 0.4);
    }
  }
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
