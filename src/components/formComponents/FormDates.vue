<template>
  <div class="dates-cnt">
    <div class="date-row flex items-center list-item" v-for="dateF in datesD" :key="dateF.id">
      <div class="dates-col-wrapper start">
        <div class="date-col">
          <p class="label mb-1">Дата начала</p>
          <q-input
            :ref="`dateStart${dateF.id}`"
            :id="dateF.id"
            outlined
            debounce="500"
            v-model="dateF.dateStart"
            @blur="this.revalidate(['dateFinish'], dateF.id)"
            @change="this.revalidate(['timeStart, timeFinish'], dateF.id)"
            mask="##-##-####"
            no-error-icon
            :rules="[
              (val) => compareWithToday(val) || errorTypes.lessThanToday,
              (val) => compareWithMaxDate(val, dateF.id) || errorTypes.moreThanFinish,
              (val) => compareWithPrev(val, dateF.id) || errorTypes.lessThanPreviousDateFinish,
              (val) => checkDate(val) || errorTypes.invalidDate,
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date today-btn mask="DD-MM-YYYY" v-model="dateF.dateStart">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="date-col">
          <p class="label mb-1">Время начала</p>
          <q-input
            :ref="`timeStart${dateF.id}`"
            @blur="revalidate(['timeFinish'], dateF.id)"
            outlined
            no-error-icon
            v-model="dateF.timeStart"
            mask="time"
            :rules="[
              'time',
              (val) => compareWithMaxTime(val, dateF.id) || errorTypes.moreThanFinishTime,
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="dateF.timeStart">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="separator"></div>
      <div class="dates-col-wrapper finish">
        <div class="date-col">
          <p class="label mb-1">Дата окончания</p>
          <q-input
            :ref="`dateFinish${dateF.id}`"
            outlined
            debounce="500"
            no-error-icon
            mask="##-##-####"
            @blur="this.revalidate(['dateStart'], dateF.id)"
            @change="this.revalidate(['timeStart', 'timeFinish'], dateF.id)"
            v-model="dateF.dateFinish"
            :rules="[
              (val) => checkDate(val) || errorTypes.invalidDate,
              (val) => compareWithMinDate(val, dateF.id) || errorTypes.lessThanStart,
              (val) => compareWithPrev(val, dateF.id) || errorTypes.lessThanPreviousDateFinish,
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date today-btn mask="DD-MM-YYYY" minimal v-model="dateF.dateFinish">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="date-col">
          <p class="label mb-1">Время окончания</p>
          <q-input
            :ref="`timeFinish${dateF.id}`"
            @blur="revalidate(['timeStart'], dateF.id)"
            outlined
            no-error-icon
            v-model="dateF.timeFinish"
            mask="time"
            :rules="[
              'time',
              (val) => compareWithMinTime(val, dateF.id) || errorTypes.lessThanStartTime,
            ]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="dateF.timeFinish">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <q-btn
        v-if="dateF.id !== 0"
        class="remove-date"
        icon="close"
        round
        size="sm"
        @click="removeDateRow(dateF.id)"
      >
      </q-btn>
    </div>
    <DateRowExample></DateRowExample>
    <q-btn
      outline
      @click="addDateRow"
      class="addDateRowBtn q-py-lg"
      :icon="hasErrors ? 'close' : 'add'"
      :label="hasErrors ? 'Исправьте ошибки' : 'Добавить дату'"
      :disable="hasErrors > 0"
    >
    </q-btn>
  </div>
</template>

<script>
import moment from 'moment';
import DateRowExample from '@/components/formComponents/DateRowExample.vue';
import { datePattern } from '@/helpers/validatorPatterns';
import { errorTypesDate } from '@/helpers/errorTypes';

export default {
  name: 'Dates',
  components: {
    DateRowExample,
  },
  props: ['dates', 'datesExample'],
  emits: ['update:dates'],
  mounted() {
    this.errorTypes = errorTypesDate;
  },
  computed: {
    hasErrors() {
      return this.errorsCount > 0;
    },
  },
  data() {
    return {
      datesD: this.dates,
      errorTypes: '',
      errorsCount: 0,
      dateFormat: 'DD/MM/YYYY',
    };
  },
  methods: {
    revalidate(targets, id) {
      this.errorsCount = 0;
      targets.forEach((t) => {
        this.$refs[t + id].validate();
      });
    },
    addDateRow() {
      const currentDates = this.datesD;
      const lastId = currentDates[currentDates.length - 1].id || 0;
      const newDate = { ...this.datesExample };
      newDate.id = lastId + 1;
      currentDates.push(newDate);
    },
    removeDateRow(id) {
      const startIndex = this.datesD.findIndex((i) => i.id === id);
      this.datesD = this.datesD.filter((i) => i.id !== id);

      this.datesD
        .slice(startIndex)
        // eslint-disable-next-line no-plusplus
        .map((i) => i.id === 0 || --i.id);
    },
    formatDate(v) {
      return moment(v, this.dateFormat).format('X');
    },

    formatTime(v) {
      return moment(v, 'HH:mm').format('X');
    },

    getDateAttr(id, attr) {
      return this.datesD.find((i) => i.id === id)[attr];
    },

    checkDate(v) {
      const res = datePattern.test(v);

      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;

      return res;
    },

    compareWithPrev(v, id) {
      if (id === 0) return true;
      const prevFinish = this.datesD[id - 1].dateFinish;
      const res = moment(v, this.dateFormat).format('X') > moment(prevFinish, this.dateFormat).format('X');

      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;

      return res;
    },
    compareWithToday(v) {
      return this.formatDate(v) > this.formatDate(new Date());
    },
    compareWithMinDate(v, id) {
      const min = this.getDateAttr(id, 'dateStart');
      if (!min) return true;
      const res = this.formatDate(v) >= this.formatDate(min);

      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;

      return res;
    },
    compareWithMaxDate(v, id) {
      const max = this.getDateAttr(id, 'dateFinish');
      if (!max) return true;
      const res = this.formatDate(v) <= this.formatDate(max);
      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;

      return res;
    },

    compareWithMinTime(v, id) {
      if (
        this.formatDate(this.getDateAttr(id, 'dateStart'))
        !== this.formatDate(this.getDateAttr(id, 'dateFinish'))
      ) {
        return true;
      }
      const min = this.getDateAttr(id, 'timeStart');
      if (!min) return true;
      const res = this.formatTime(v) >= this.formatTime(min);

      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;
      return res;
    },
    compareWithMaxTime(v, id) {
      if (
        this.formatDate(this.getDateAttr(id, 'dateStart'))
        !== this.formatDate(this.getDateAttr(id, 'dateFinish'))
      ) {
        return true;
      }
      const max = this.getDateAttr(id, 'timeFinish');
      if (!max) return true;
      const res = this.formatTime(v) <= this.formatTime(max);

      if (!res) this.errorsCount += 1;
      else this.errorsCount -= 1;

      return res;
    },
  },
  watch: {
    datesD: {
      handler() {
        this.$emit('update:dates', this.datesD);
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.dates-cnt {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

:deep(.dates-col-wrapper) {
  flex-grow: 1;
  display: flex;
  gap: 20px;
  @media (max-width: 555px) {
    flex-direction: column;
  }
}

:deep(.dates-cnt) {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

:deep(.date-row) {
  gap: 20px;
  padding: 20px;
  background: $dateRow-bg;
  position: relative;
  @media (max-width: 1150px) {
    flex-direction: column;
  }

  .date-col {
    flex-grow: 1;
  }

  .remove-date {
    position: absolute;
    top: -10%;
    right: -1%;
    color: $close-color;
    background: $close-bg;
  }
}

:deep(.separator) {
  position: relative;
  height: 3px;
  top: 6px;
  width: 22px;
  background: $input-border-color;
  @media (max-width: 1150px) {
    display: none;
  }
}

.addDateRowBtn {
  align-self: flex-start;
  @media (max-width: 555px) {
    align-self: center;
  }
}
</style>
