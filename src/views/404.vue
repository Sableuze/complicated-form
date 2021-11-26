<template>
  <div class="container">

    <h1 class="error-title">Пустота...</h1>
    <p class="error-description">Похоже что-то не так с адресом. Проверьте-ка URL</p>

    <div class="error__buttons">
      <q-btn
        size="lg"
        padding="md"
        color="accent"
        @click="$router.push('/')">
        Вернуться
      </q-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: '404',
  components: {
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 70vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 480px) {
    margin-top: 100px;
  }
}
h1{
  font-size: 40px;
}
p{
  font-size: 36px;
}

.spin {
  transform: rotate(-135deg)
}

.error__buttons {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  @media (max-width: 968px) {
    // justify-content: start;
    // gap: 20px;
  }
}

.error-bot {
  width: 8rem;
  // @media (max-width: 480px) {
  //   width: 8rem;
  // }
}

.error-title {
  font-weight: bold;
  font-size: 24px;
}
.error-description {
  font-weight: 300;
  font-size: 18px;
}
</style>
