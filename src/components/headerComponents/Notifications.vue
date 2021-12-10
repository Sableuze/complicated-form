<template>
  <q-btn-dropdown flat round dense icon="person">
    <div class="row no-wrap q-pa-md">

      <div class="column items-center">

        <div class="text-subtitle1 ">{{ getUser.username }}</div>
        <div class="text-subtitle2 q-mt-xs q-mb-xs">{{ theRole }}</div>
        <q-space></q-space>
        <div class="row q-mt-md q-gutter-xs">
          <Logout-button></Logout-button>
          <q-btn
            color="deep-orange-13"
            label="Редактировать профиль"
            unelevated
            size="sm"
            v-close-popup
            @click="$router.push({name:'EditUserInfo'})"
          />
        </div>
      </div>
    </div>
  </q-btn-dropdown>

</template>

<script>
export default {
  name: 'Notifications',
};
</script>

<style scoped>

</style>
