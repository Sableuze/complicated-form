<template>
  <slot name="title-holder">Информация об организаторе</slot>
  <div class="flex column">
    <p class="label mb-1">Организатор</p>
    <q-input
      outlined
      :model-value="holder"
      @update:model-value="emitUpdate('holder', $event.toLowerCase().trim())"
      debounce="500"
      placeholder="Coca-Cola"
      :rules="[
        () => !!this.holder || errorTypes.noHolder,
        (val) => val.length >= 3 || errorTypes.short,
      ]"
    >
    </q-input>
  </div>
  <slot class="title" name="title-contact">Контактные данные</slot>
  <div class="flex main-fields">
    <div class="flex column col-grow">
      <p class="label mb-1">Телефон</p>
      <q-input
        outlined
        no-error-icon
        type="tel"
        mask="+# (###) ###-##-##"
        :model-value="number"
        @update:model-value="emitUpdate('number', $event)"
        debounce="500"
        placeholder="+7 (999) 555-33-22"
        :rules="[
          (val) => val.length > 0 || errorTypes.nuNumber,
          (val) => val.replace(/[^0-9]/g, '').length === 11 || errorTypes.incompleteNumber,
        ]"
      ></q-input>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">E-mail</p>
      <Email :model-value="email" @update:model-value="emitUpdate('email', $event.trim())"></Email>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">Город организатора</p>
      <City
        :model-value="city"
        @update:model-value="emitUpdate('city', $event)"
        :rules="[(val) => !!val || errorTypes.noCity]"
      ></City>
    </div>
  </div>
</template>
<script>
import City from '@/components/formComponents/FormCity.vue';
import { errorTypesMain } from '@/helpers/validation/errorTypes';
import Email from '@/components/formComponents/FormEmail.vue';

export default {
  name: 'MainInfo',
  props: {
    holder: {
      type: String,
      default: '',
    },
    number: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
  },
  emits: ['update:city', 'update:email', 'update:number', 'update:holder'],
  components: {
    Email,
    City,
  },
  mounted() {
    this.errorTypes = errorTypesMain;
  },
  data() {
    return {
      options: [],
      errorTypes: '',
    };
  },
  methods: {
    emitUpdate(target, newVal) {
      this.$emit(`update:${target}`, newVal);
    },

  },
};
</script>

<style scoped lang="scss">
.main-fields {
  gap: 20px;
}
</style>
