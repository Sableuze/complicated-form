<template>
  <slot class="title" name="title-regular">Общая информация</slot>
  <div class="flex column">
    <p class="label mb-1">Название</p>
    <q-input
      outlined
      no-error-icon
      v-model="nameD"
      @update:model-value="emitUpdate('name', nameD.toLowerCase().trim())"
      debounce="500"
      :rules="[
        (val) => val.length > 0 || errorTypes.noName,
        (val) => val.length >= 5 || errorTypes.shortName,
        (val) => val.length <= 50 || errorTypes.tooLongName,
      ]"
    ></q-input>
  </div>
  <slot name="pictureUploader"></slot>
  <div class="flex column">
    <slot class="label" name="label-description">Подробное описание</slot>
    <q-input
      outlined
      no-error-icon
      type="textarea"
      v-model="descriptionD"
      @update:model-value="emitUpdate('description', descriptionD.trim())"
      debounce="500"
      :rules="[
        (val) => val.length > 0 || errorTypes.noDescription,
        (val) => val.length >= 20 || errorTypes.shortDescription,
      ]"
    >
    </q-input>
  </div>
</template>

<script>
import { errorTypesRegular } from '@/helpers/errorTypes';

export default {
  name: 'RegularInfo',
  props: ['name', 'description'],
  emits: ['update:name', 'update:description'],
  mounted() {
    this.errorTypes = errorTypesRegular;
  },
  data() {
    return {
      nameD: this.name,
      descriptionD: this.description,
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

<style scoped></style>
