<template>
  <q-select
    outlined
    no-error-icon
    use-input
    hide-selected
    fill-input
    input-debounce="300"
    :options="options"
    @filter="getCity"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'City',
  methods: {
    ...mapActions(['fetchCity']),
    async getCity(val, update) {
      const res = await this.fetchCity({ query: val });
      update(() => {
        if (val === '') {
          this.options = res;
        } else {
          const needle = val.toLowerCase();
          this.options = res.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        }
      });
    },
  },
  data() {
    return {
      options: [],
    };
  },
};
</script>

<style scoped></style>
