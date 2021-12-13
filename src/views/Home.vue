<template>
  <div id="parent" class="full-width full-height justify-between row wrap"
       style="overflow: hidden;">
    <div class="col-8" style="overflow: auto;">
      <q-card class="no-border-radius full-height">
        <q-card-section>
            <q-input
              v-model="name.value"
              class="mb-3"
              :disable="isLoading"
              debounce="400" @update:model-value="searchEvents"
              label="Название мероприятия"
            >

            </q-input>
          <Published-list :events="events"></Published-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-3 bg-blue-13" style="overflow: auto;">
      <q-card class="no-border-radius">
        <q-card-section class="filters-cnt">
          <div class="filters">
            <div class="city">
              <p class="label mb-1">Город организатора</p>
              <City v-model="filters.city.value"></City>
            </div>
            <div class="rating">
              <Rating></Rating>
            </div>
            <div class="dates">
              <q-input
                label="Дата начала"
                outlined
                v-model="filters.dateStart.value"
                mask="##-##-####"
                no-error-icon
                lazy-rules
                ref="dateStart"

                :rules="[val => isLessThanMax(val) || errorTypes.moreThanFinish,
               val => checkDate(val) || errorTypes.invalidDate]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" cover transition-show="scale"
                                   transition-hide="scale">
                      <q-date today-btn mask="DD-MM-YYYY" v-model="filters.dateStart.value">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                label="Дата окончания"
                ref="dateFinish"
                class="toValidate"
                outlined
                v-model="filters.dateFinish.value"
                mask="##-##-####"
                no-error-icon
                lazy-rules
                :rules="[val => isMoreThanMin(val) || errorTypes.lessThanStart,

               val => checkDate(val) || errorTypes.invalidDate]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" cover transition-show="scale"
                                   transition-hide="scale">
                      <q-date today-btn mask="DD-MM-YYYY" v-model="filters.dateFinish.value">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>
          </div>
          <div class="toggle-cnt">
            <h2 class="label">Включить фильтры</h2>
            <q-toggle v-model="useFilters" :disable="isLoading"
                      @update:model-value="toggleFilters"></q-toggle>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import City from '@/components/formComponents/City.vue';
import Rating from '@/components/formComponents/Rating.vue';
import PublishedList from '@/components/PublishedList.vue';
import { datePattern } from '@/helpers/validatorPatterns';
import { errorTypesDate } from '@/helpers/errorTypes';
import Db from '@/api/databaseWrapper';

export default {
  name: 'Home',
  components: {
    City, Rating, PublishedList,
  },
  mounted() {
    this.errorTypes = errorTypesDate;
  },
  computed: {
    ...mapGetters(['isLoading']),
    dateStartFormatted() {
      return moment(this.filters.dateStart.value, this.dateFormat).format('X');
    },
    dateFinishFormatted() {
      return moment(this.filters.dateFinish.value, this.dateFormat).format('X');
    },
  },
  data() {
    return {
      events: [],
      errorTypes: '',
      drawerRight: false,
      useFilters: false,
      name: {
        operand: '==',
        value: '',
      },
      filters: {
        dateStart: {
          operand: '>=',
          value: '',
          date: true,
        },
        dateFinish: {
          operand: '<=',
          value: '',
          date: true,

        },
        city: {
          operand: '==',
          value: '',
        },
      },
      dateFormat: 'DD/MM/YYYY',
    };
  },
  methods: {
    async searchEvents() {
      const name = this.name.value;
      if (!this.useFilters && !name) return false;

      const filters = [];
      const query = [];
      if (name) query.push(`name == "${name}"`);
      if (this.useFilters) {
        Object.entries(this.filters).forEach(([key, val]) => {
          if (val.value) {
            if (val.date) filters.push(`${key} ${val.operand} ${this.formatDate(val.value)}`);
            else filters.push(`${key} ${val.operand} "${val.value}"`);
          }
        });
      }

      if (!query.length && !filters.length) return false;

      const { records } = await Db.read({
        query: `${[...query, ...filters].join(' and ')} and status == "published"`,
        table: 'events',
      });
      this.events = records;
    },

    toggleFilters() {
      if (!(this.$refs.dateStart.validate() && this.$refs.dateFinish.validate())) {
        if (this.useFilters) this.useFilters = false;
      } else {
        this.searchEvents();
      }
    },

    checkDate(v) {
      if (!v) return true;
      const res = datePattern.test(v);
      if (res) return true;

      this.useFilters = false;
      return false;
    },

    formatDate(v) {
      return moment(v, this.dateFormat).format('X');
    },

    isMoreThanMin(v) {
      if (!v) return true;

      const min = this.dateStart;
      if (!min) return true;
      const res = this.formatDate(v) >= this.formatDate(min);
      if (res) return true;

      this.useFilters = false;
      return false;
    },
    isLessThanMax(v) {
      if (!v) return true;

      const max = this.dateFinish;
      if (!max) return true;
      const res = this.formatDate(v) >= this.formatDate(max);
      if (res) return true;

      this.useFilters = false;
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.view-header {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filters-cnt {
  border-left: 1px solid;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background: #000;
  }
}

.filters-btn {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
