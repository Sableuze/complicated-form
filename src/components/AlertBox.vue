<template>
  <div class="alert">
    <q-icon :name="icon" class="icon" size="lg" color="red">
    </q-icon>
    <p class="alert-text title mb-0"><slot name="alert-text"></slot></p>
  </div>

</template>

<script>
export default {
  name: 'AlertBox',
  props: {
    icon: {
      type: String,
      default: 'info',
    },
  },
};
</script>

<style scoped lang="scss">
.alert {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26px;
  gap: 20px;
  box-shadow: 0px 8px 25px rgba(155, 99, 248, 0.15);
  border-radius: 4px;
}
.alert-text{

}
.icon {
  @media (max-width: 555px) {
    display: none;
  }
}
</style>
