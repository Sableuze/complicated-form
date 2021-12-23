// I have separated it even though it has little functionality in case you use live search

<template>
  <div class="flex column">
    <p class="label mb-1">Адрес мероприятия</p>
    <q-select
      ref="addressSelect"
      outlined
      no-error-icon
      :disable="!city"
      v-model="addressItem"
      @update:model-value="onChoose"
      use-input
      fill-input
      hide-selected
      input-debounce="300"
      :label="addressToShow"
      :placeholder="placeholder"
      :options="options"
      @filter="onFilter"
      lazy-rules
      :rules="[
        () => !!this.street || errorTypes.noStreet,
        () => !!this.house || errorTypes.noHouse,
      ]"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
      <template v-if="addressToShow" v-slot:append>
        <q-icon name="cancel" @click.stop="onResetInput" class="cursor-pointer" />
      </template>
    </q-select>
  </div>
</template>

<script>
import Address from '@/api/addressService';
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
      streetId: '',
      house: '',
      options: [],
      searchHouse: false,
      errorTypes: '',
    };
  },
  methods: {
    async getStreet(val, update) {
      const res = await Address.getStreet(val, this.city);
      this.streetId = res.allData.suggestions;
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
      const res = await Address.getHouse(val, this.streetId);
      update(() => {
        if (val === '') {
          this.options = res.values;
        } else {
          const needle = val.toLowerCase();
          this.options = res.values.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        }
      });
    },
    onFilter(val, update) {
      if (!this.searchHouse) {
        this.getStreet(val, update);
      } else {
        this.getHouse(val, update);
      }
    },
    onChoose() {
      if (!this.searchHouse) {
        this.chooseStreet();
      } else {
        this.chooseHouse();
      }
    },
    async chooseStreet() {
      this.addressToShow += `, ${this.addressItem}`;
      this.street = this.addressItem;
      await this.emitUpdate('address', { street: this.street, house: this.address.house });
      this.streetId = this.streetId.find((i) => i.value === this.street).data.street_fias_id;
      this.searchHouse = true;
      this.options = [];
      this.placeholder = 'Выберите номер дома';
      this.$refs.addressSelect.updateInputValue('');
      this.$refs.addressSelect.showPopup();
    },
    chooseHouse() {
      this.house = this.addressItem;
      this.emitUpdate('address', { house: this.house, street: this.address.street });
      this.options = [];
    },

    onResetInput() {
      this.addressItem = null;
      this.addressToShow = this.city;
      this.options = [];
      this.house = null;
      this.searchHouse = false;
      this.emitUpdate('address', { house: undefined, street: undefined });
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
