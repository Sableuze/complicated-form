<template>
  <div>
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
    <component :is="layout">

    </component>
  </div>
</template>

<script>
import LayoutAuth from '@/layouts/LayoutAuth.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import ConfirmDialog from '@/components/dialogComponents/ConfirmDialog.vue';

export default {
  name: 'app',
  components: { LayoutAuth, LayoutDefault, ConfirmDialog },
  computed: {
    layout() {
      if (this.$route.meta.layout === 'LayoutAuth') {
        return 'LayoutAuth';
      }
      return 'LayoutDefault';
    },

  },

};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,900;1,900&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}
.form-auth{
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.title {
  font-weight: 600;
  font-size: 18px;
}

.label {
  font-weight: 600;
  font-size: 16px;
  color: $label-color;
}

.btn {
  width: 300px;
  white-space: nowrap;
  @media (max-width: 500px) {
    font-size: 12px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
}

.mb-0 {
  margin-bottom: 0;
}

.mb-1 {
  margin-bottom: 6px;
}
.mb-2 {
  margin-bottom: 12px;
}

.mb-3 {
  margin-bottom: 16px;
}

h2 {
  line-height: 1rem;
}

// QUASAR ==========================
.q-field--outlined .q-field__control:before {
  border: 1px solid $input-border-color;
}
</style>
