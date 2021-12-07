<template>
  <div>
    <ActionResult :redirect="{name: 'Home'}"></ActionResult>
    <h2 class="title"></h2>
    <api-errors :errorCodes="errors" :source="errorTypes"></api-errors>
    <q-form @submit="onSubmit">
      <q-input
        v-model="code"
        mask="###-###-###"
        label="Неужели админ??"
        ref="codeInput"
        :rules="[val => !!val || errorTypes.noCode]"
      >
      </q-input>

      <q-btn
        :disable="getLoadingStatus"
        type="submit"
        color="deep-orange-10"
        size="lg"
        class="self-center q-mt-lg"
        label="Активировать">

      </q-btn>

    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Db from '@/api/databaseWrapper';
import ActionResult from '@/components/dialogComponents/ActionResult.vue';
import apiErrors from '@/components/dialogComponents/apiErrors.vue';
import { errorTypesRedeem } from '@/helpers/errorTypes';

export default {
  name: 'ActivateCode',
  components: {
    ActionResult, apiErrors,
  },
  async mounted() {
    this.errorTypes = errorTypesRedeem;
    await Db.create({
      record: {
        code: '111-111-111',
      },
      table: 'codes',
    });
    console.log(await Db.read({
      table: 'codes',
    }));
    console.log(await Db.read({
      table: 'users',
    }));
  },
  computed: {
    ...mapGetters(['getLoadingStatus', 'getUser']),
  },
  data() {
    return {
      code: '',
      theCode: '',

      errors: [],
      errorTypes: '',
    };
  },
  methods: {
    ...mapActions(['updateUserInfo']),

    async onSubmit() {
      debugger;
      const records = await Db.read({
        query: `code == "${this.code}"`,
        table: 'codes',
      });
      if (records.length) {
        this.setTheCode(records);
        if (this.theCode) {
          const { res } = await Db.update({
            id: this.getUser.accountId,
            record: {
              profile: {
                ...this.getUser.profile,
                role: 'admin',
              },
            },
            table: 'users',
          });
          if (res) {
            Db.delete({ id: this.theCode.id, table: 'codes' });
            this.$store.dispatch('changeSuccessStatus', true);
          }
        }
      } else if (this.errors.indexOf('invalidCode') === -1) this.errors.push('invalidCode');
    },

    setTheCode(val) {
      this.theCode = val.find((i) => i.code === `${this.code}`);
    },
  },
};
</script>

<style scoped>

</style>
