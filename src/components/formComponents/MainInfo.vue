<template>
  <slot name="title-holder">Информация об организаторе</slot>
  <div class="flex column">
    <p class="label mb-1">Организатор</p>
    <q-input
      outlined
      no-error-icon
      v-model="holderD"
      @update:model-value="$emit('update:holder', holderD.toLowerCase())"
      debounce="500"
      placeholder="Coca-Cola"
      :rules="[() => !!this.holder || errorTypes.noHolder,
      val => val.length >= 3 || errorTypes.short]"
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
        v-model="numberD"
        @update:model-value="$emit('update:number', numberD)"
        debounce="500"
        placeholder="+7 (999) 555-33-22"
        :rules="[val => val.length > 0  || errorTypes.nuNumber,
        val => val.replace(/[^0-9]/g,'').length === 11
      || errorTypes.incompleteNumber]"
      ></q-input>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">E-mail</p>
      <Email
        v-model="emailD"
        @update:model-value="$emit('update:email', emailD)"
      ></Email>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">Город организатора</p>
      <City
        v-model="cityD"
        @update:model-value="$emit('update:city', cityD)"
        :rules="[() => !!cityD || errorTypes.noCity]"></City>
    </div>
  </div>

</template>
<script>
import City from '@/components/formComponents/City.vue';
import { errorTypesMain } from '@/helpers/errorTypes';
import Email from '@/components/formComponents/Email.vue';

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
  components: {
    Email, City,
  },
  mounted() {
    this.errorTypes = errorTypesMain;
  },
  data() {
    return {
      holderD: this.holder,
      numberD: this.number,
      emailD: this.email,
      cityD: this.city,
      options: [],
      errorTypes: '',
    };
  },

};
</script>

<style scoped lang="scss">
.main-fields {
  gap: 20px;
}
</style>
