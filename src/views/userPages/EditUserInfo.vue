<template>
  <div class="auth-cnt">
    <apiErrors :errorCodes="errors" :source="errorTypes"></apiErrors>
    <q-form @submit="onSubmit" class="form-auth">
      <q-input
        borderless
        v-model="form.name"
        label="Ваше имя"
        debounce="500"
        :rules="[val => val.length >= 3 || errorTypes.shortName]"
      >
      </q-input>
      <q-input
        borderless
        v-model="form.blockNumber"
        label="Номер блока"
        mask="###"
        :rules="[val => !!val || errorTypes.noBlockNumber]"
      ></q-input>
      <q-input
        borderless
        :disable="getLoadingStatus"
        v-model="form.roomNumber"
        :label="(form.blockNumber || 'Номер комнаты')+'.'"
        mask="#"
        placeholder="Номер комнаты"
        :rules="[val => !!val || errorTypes.noRoomNumber]"
      ></q-input>
      <file-uploader
        v-model:picture="form.picture"
        :hintMsg="''">
      </file-uploader>
      <div class="buttons">
        <q-btn
          :disable="getLoadingStatus"
          v-if="isProfileFilled"
          size="lg"
          @click="$router.back()"
          label="Назад"
        ></q-btn>
        <LogoutButton :size="'lg'" :color="'grey-10'" v-else></LogoutButton>

        <q-btn
          :loading="getLoadingStatus"
          type="submit"
          color="deep-orange-10"
          size="lg"
          class="self-center"
          label="Продолжить"></q-btn>
      </div>
    </q-form>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import apiErrors from '@/components/dialogComponents/ApiErrors.vue';
import { errorTypesInfo } from '@/helpers/errorTypes';
import FileUploader from '@/components/formComponents/FileUploader.vue';
import LogoutButton from '@/components/authComponents/LogoutButton.vue';

export default {
  name: 'AddUserInfo',
  components: {
    apiErrors, FileUploader, LogoutButton,
  },
  mounted() {
    this.errorTypes = errorTypesInfo;
    Object.entries(this.getUser.profile).forEach(([key, value]) => {
      this.form[key] = value;
    });
  },
  computed: {
    ...mapGetters(['getUser', 'isLoading', 'isProfileFilled']),

  },
  data() {
    return {
      form: {
        name: '',
        picture: '',
        blockNumber: '',
        roomNumber: '',
        role: 'user',
      },
      errorTypes: '',
      errors: [],
    };
  },
  methods: {
    ...mapActions(['updateUserInfo', 'logout']),
    async onSubmit() {
      const ok = await this.updateUserInfo({
        id: this.getUser.accountId,
        data: {
          ...this.form,
        },
      });

      if (ok) {
        this.$router.push({ name: 'Home' });
      }
    },

  },
};
</script>

<style scoped>
.form-auth {
  align-items: center;
}
.buttons {
  margin-top: 8px;
  display: flex;
  gap: 16px;
}
</style>
