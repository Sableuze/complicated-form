<template>
  <div>
    <ActionResult :failureText="''" :successText="''" :redirect="{ name: 'Home' }"></ActionResult>
    <h2 class="title"></h2>
    <!--    <api-errors :errorCodes="errors" :source="errorTypes"></api-errors>-->
    <q-form @submit="onSubmit">
      <q-input
        v-model="code"
        mask="###-###-###"
        label="Неужели админ??"
        ref="codeInput"
        :rules="[(val) => !!val || errorTypes.noCode]"
      >
      </q-input>

      <q-btn
        :disable="getLoadingStatus"
        type="submit"
        color="deep-orange-10"
        size="lg"
        class="self-center q-mt-lg"
        label="Активировать"
      >
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Notify } from 'quasar';
import Db from '@/api/databaseService';
import ActionResult from '@/components/dialogComponents/ActionResult.vue';
// import apiErrors from '@/components/dialogComponents/apiErrors.vue';
import { errorTypesRedeem } from '@/helpers/validation/errorTypes';

export default {
  name: 'ActivateCode',
  components: {
    ActionResult,
    // apiErrors,
  },
  // async mounted() {
  //   // this.errorTypes = errorTypesRedeem;
  //   // ;
  //   await Db.create({
  //     record: {
  //       code: '111-111-111',
  //     },
  //     table: 'codes',
  //   }, false);
  // },
  computed: {
    ...mapGetters(['isLoading', 'getUser']),
  },
  data() {
    return {
      code: '',
      theCode: '',

      // errors: [],
      // errorTypes: '',
    };
  },
  methods: {
    ...mapActions(['updateUserInfo', 'checkCode']),

    async onSubmit() {
      const records = await this.checkCode(this.code);
      if (records.length) {
        this.setTheCode(records);
        if (this.theCode) {
          const ok = await this.updateUserInfo({
            id: this.getUser.accountId,
            record: {
              profile: {
                ...this.getUser.profile,
                role: 'admin',
              },
            },
          });
          if (ok) {
            Db.delete({ id: this.theCode.id, table: 'codes' }, false);
            this.$store.dispatch('changeSuccessStatus', true);
          }
        }
      } else {
        Notify.create({
          message: errorTypesRedeem.invalidCode,
          type: 'negative',
          position: 'top-right',
        });
      }
    },

    setTheCode(val) {
      this.theCode = val.find((i) => i.code === `${this.code}`);
    },
  },
};
</script>

<style scoped></style>
