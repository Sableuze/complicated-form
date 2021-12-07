<template>
  <ActionResult></ActionResult>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
  >
    <div class="form-section form-header">
      <Main-info
        v-model:holder="form.holder"
        v-model:number="form.number"
        v-model:email="form.email"
        v-model:city="form.city"
      >
        <template v-slot:title-holder>
          <h2 class="title mb-0">Информация об организаторе</h2>
        </template>
        <template v-slot:title-contact><h2 class="title mb-0">Контактные данные</h2></template>
      </Main-info>
    </div>
    <div class="form-section form-body">
      <Regular-info
        v-model:name="form.name"
        v-model:description="form.description"
      >
        <template v-slot:pictureUploader>
          <File-uploader
            v-model:picture="form.picture">
          </File-uploader>
        </template>
        <template v-slot:title-regular><h2 class="title mb-0">Общая информация</h2></template>
      </Regular-info>
      <Dates
        v-model:dates="form.dates"
        :dates-example="datesExample"
      ></Dates>
    </div>
    <div class="form-section form-footer">
      <div class="footer-inputs">
        <Rating
          v-if="this.getRatingList"
          class="col-grow"
          v-model:rating="form.rating"
        ></Rating>
        <Address
          class="col-grow"
          v-model:address="form.address"
          :city="form.city"
        ></Address>
      </div>
    </div>
    <div class="buttons">
      <q-btn
        outline
        padding="md"
        class="btn label"
        type="reset"
        label="Отменить"
      ></q-btn>
      <q-btn
        filled
        padding="md"
        class="btn label"
        type="submit"
        color="accent"
        label="Далее"
      >
      </q-btn>
    </div>
  </q-form>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MainInfo from '@/components/formComponents/MainInfo.vue';
import RegularInfo from '@/components/formComponents/RegularInfo.vue';
import FileUploader from '@/components/formComponents/FileUploader.vue';
import Dates from '@/components/formComponents/Dates.vue';
import Rating from '@/components/formComponents/Rating.vue';
import Address from '@/components/formComponents/Address.vue';
import ActionResult from '@/components/dialogComponents/ActionResult.vue';
import { reformatDates } from '@/helpers/reformatDatesHelper';

export default {
  name: 'Form',
  props: {
    action: {
      type: String,
      validator(value) {
        return ['create', 'edit'].includes(value);
      },
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  components: {
    RegularInfo,
    MainInfo,
    FileUploader,
    Dates,
    Rating,
    Address,
    ActionResult,
  },
  mounted() {
    this.$store.dispatch('loadRating');
    if (this.action === 'create') {
      this.form.id = this.getLastEventId + 1;
      this.form.creatorId = this.getUser.id;
    }
    if (this.action === 'edit') {
      const theForm = this.$store.getters.getEventById(this.id);
      theForm.dates = reformatDates(theForm.dates, 'DD/MM/YYYY');
      this.form = theForm;
    }
  },
  computed: {
    ...mapGetters(['getRatingList', 'getLastEventId', 'getDraftEvents', 'getUser']),
  },
  data() {
    return {
      form: {
        id: '',
        creatorId: '',
        holder: '',
        number: '',
        email: '',
        city: '',
        name: '',
        picture: undefined,
        description: '',
        dates: [
          {
            id: 0,
            dateStart: null,
            dateFinish: null,
            timeStart: null,
            timeFinish: null,
          },
        ],
        rating: {
          title: '16+',
          id: 0,
        },
        address: {
          street: '',
          house: '',
        },
        status: 'draft',

      },
      datesExample: {
        id: 0,
        dateStart: null,
        dateFinish: null,
        timeStart: null,
        timeFinish: null,
      },
      ratingExample: {
        title: '16+',
        id: 0,
      },
      addressExample: {
        street: '',
        house: '',
      },
    };
  },
  methods: {
    ...mapActions(['createEvent', 'editEvent']),
    async onSubmit() {
      const event = { ...this.form };
      if (this.action === 'create') {
        await this.createEvent(event);
        this.$router.push(`/${event.id}/suggest`);
      }
      if (this.action === 'edit') await this.editEvent(this.form.id, event);
    },
    async onReset() {
      // eslint-disable-next-line no-return-assign,no-unused-vars
      const ok = await this.$root.$refs.confirmDialog.show({
        message: 'Вы действительно хотите очистить форму?',
        okButton: 'Да',
        okColor: 'red',
        noButton: 'Отмена',
        icon: '',
        iconColor: 'red',
      });
      if (ok) {
        Object.keys(this.form).forEach((k) => {
          if (k === 'dates') this.form[k] = [this.datesExample];
          if (k === 'status') return true;
          if (k === 'id') return true;
          if (typeof this.form[k] === 'string') this.form[k] = '';
          else if (typeof this.form[k] === 'number') this.form[k] = 0;
        });
        this.form.rating = this.ratingExample;
        this.form.address = this.addressExample;
      }
    },

  },
};
</script>

<style scoped lang="scss">
.form-section {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.footer-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 20px;

}

// ==============================================================

</style>
