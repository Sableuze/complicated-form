<template>

    <q-list padding>
      <q-item clickable v-ripple :to="{name: 'Home'}" exact>
        <q-item-section avatar>
          <q-icon name="home"/>
        </q-item-section>

        <q-item-section>
          Главная
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name: 'Notifications'}">
        <q-item-section avatar>
          <q-item-label class="caption" caption>{{ newNotifications?.length || '' }}
          </q-item-label>
          <q-icon name="notifications"/>
        </q-item-section>

        <q-item-section>
          Уведомления
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{name: 'CreateEvent'}">
        <q-item-section avatar>
          <q-icon name="add_circle"/>
        </q-item-section>

        <q-item-section>
          Создать
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name: 'MyEvents'}">
        <q-item-section avatar>
          <q-icon name="mode_edit"/>
        </q-item-section>

        <q-item-section>
          Мои мероприятия
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple :to="{name: 'EditUserInfo'}">
        <q-item-section avatar>
          <q-icon name="person"/>
        </q-item-section>

        <q-item-section>
          Профиль
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name: 'ActivateCode'}"
              class="bg-deep-orange-14 text-white">
        <q-item-section avatar>
          <q-icon name="workspace_premium"/>
        </q-item-section>

        <q-item-section>
          Активировать
        </q-item-section>
      </q-item>
      <q-space class="spacer"></q-space>
      <q-separator color="grey-10"></q-separator>
      <q-space class="spacer"></q-space>

      <q-item v-if="role === 'admin'"
              clickable v-ripple :to="{name: 'ModerateList'}"
              class="bg-deep-orange-14 text-white">
        <q-item-section avatar>
          <q-icon name="gavel"/>
        </q-item-section>

        <q-item-section>
          Модерировать
        </q-item-section>
      </q-item>
    </q-list>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MenuList',
  computed: {
    ...mapGetters({ role: 'getUserRole', newNotifications: 'getOutstandingNotifications' }),
  },

};
</script>

<style scoped lang="scss">
.caption {
  position: absolute;
  top: 0;
  color: $error-color;
  font-weight: 600;
}
.spacer{
  height: 16px;
}
</style>
