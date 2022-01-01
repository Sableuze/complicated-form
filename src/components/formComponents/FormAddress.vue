// I have separated it even though it has little functionality in case you use live search

<template>
  <div class="flex column">
    <p class="label mb-1">Адрес мероприятия</p>
    <q-select
      ref="addressSelect"
      outlined
      no-error-icon
      v-model="addressItem"
      @update:model-value="onChoose(addressItem)"
      @filter="onInput"
      use-input
      fill-input
      hide-selected
      input-debounce="500"
      :disable="!city"
      :label="addressToShow"
      :placeholder="placeholder"
      :options="options"
      lazy-rules
      :rules="[
        () => !!this.street || errorTypes.noStreet,
        () => !!this.house || errorTypes.noHouse,
      ]"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results</q-item-section>
        </q-item>
      </template>
      <template v-if="addressToShow" v-slot:append>
        <q-icon name="cancel" @click.stop="onResetInput" class="cursor-pointer"/>
      </template>
    </q-select>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { errorTypesAddress } from '@/helpers/errorTypes';

export default {
  name: 'Address',
  props: {
    address: {
      type: Object,
    },
    city: {
      type: String,
    },
  },
  emits: ['update:address'],
  mounted() {
    this.errorTypes = errorTypesAddress;
  },
  data() {
    return {
      addressItem: '',
      addressToShow: '',
      placeholder: 'Выберите улицу',
      street: '',
      fullStreetData: '',
      streetId: '',
      house: '',
      options: [],
      searchHouse: false,
      errorTypes: '',
    };
  },
  methods: {
    /* onInput => searchH ? getHouse : getStreet
    getStreet => searchH = true,
    getH
     */

    ...mapActions(['fetchStreet', 'fetchHouse']),
    async getStreet(val, update) {
      if (!val) return false;
      const res = await this.fetchStreet({ query: val, city: this.city });
      if (res) this.fullStreetData = res.fullData.suggestions;
      update(() => {
        if (val === '') {
          this.options = res.values;
        } else {
          const needle = val.toLowerCase();
          this.options = res.values.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        }
      });
    },

    async getHouse(val, update) {
      const res = await this.fetchHouse({ query: val, streetId: this.streetId });
      update(() => {
        if (val === '') {
          this.options = res.values;
        } else {
          const needle = val.toLowerCase();
          this.options = res.values.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        }
      });
    },
    onInput(val, update) {
      if (this.searchHouse) {
        this.getHouse(val, update);
      } else {
        this.getStreet(val, update);
      }
    },
    onChoose(addressItem) {
      if (this.searchHouse) {
        this.chooseHouse(addressItem);
      } else {
        this.chooseStreet(addressItem);
      }
    },
    async chooseStreet(addressItem) {
      this.addressToShow += `, ${addressItem}`;
      this.street = addressItem;
      await this.emitUpdate('address', { street: this.street, house: this.address.house });
      this.streetId = this.fullStreetData.find((i) => i.value === this.street).data.street_fias_id;
      this.searchHouse = true;
      this.options = [];
      this.placeholder = 'Выберите номер дома';
      this.$refs.addressSelect.updateInputValue('');
      this.$refs.addressSelect.showPopup();
    },
    chooseHouse(addressItem) {
      this.house = addressItem;
      this.emitUpdate('address', { street: this.address.street, house: this.house });
      this.options = [];
    },

    onResetInput() {
      console.log('reset');
      this.addressItem = null;
      this.addressToShow = this.city;
      this.options = [];
      this.street = undefined;
      this.house = undefined;
      this.searchHouse = false;
      this.placeholder = 'Выберите улицу';
      this.emitUpdate('address', { street: undefined, house: undefined });
    },

    emitUpdate(target, newVal) {
      this.$emit(`update:${target}`, newVal);
    },
  },
  watch: {
    city() {
      this.addressToShow = this.city;
      this.onResetInput();
    },
  },
};
</script>

<style scoped></style>
