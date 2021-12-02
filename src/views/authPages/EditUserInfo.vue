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
          v-if="isFirstTime"
          size="lg"
          @click="$router.back()"
          label="Назад"
        ></q-btn>
        <q-btn
          :disable="getLoadingStatus"
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
import apiErrors from '@/components/apiErrors.vue';
import { errorTypesInfo } from '@/helpers/errorTypes';
import FileUploader from '@/components/formComponents/FileUploader.vue';

export default {
  name: 'AddUserInfo',
  components: {
    apiErrors, FileUploader,
  },
  mounted() {
    this.errorTypes = errorTypesInfo;
    Object.entries(this.getUser.profile).forEach(([key, value]) => {
      this.form[key] = value;
    });
  },
  computed: {
    ...mapGetters(['getUser', 'getLoadingStatus']),
    isFirstTime() {
      return Object.values(this.form).some((i) => i);
    },
  },
  data() {
    return {
      form: {
        name: '',
        picture: '',
        blockNumber: '',
        roomNumber: '',
      },
      errorTypes: '',
      errors: [],
    };
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    onSubmit() {
      const { status } = this.updateUserInfo({
        id: this.getUser.accountId,
        data: {
          ...this.form,
        },
      });
      if (status) {
        if (status && this.errors.indexOf(status)) this.errors.push(status);
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
