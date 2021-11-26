<template>
  <slot name="title-holder">Информация об организаторе</slot>
  <div class="flex column">
    <p class="label mb-1">Организатор</p>
    <q-input
      outlined
      no-error-icon
      v-model="holderD"
      @update:model-value="$emit('update:holder', holderD)"
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
        placeholder="+7 (999) 555-33-22"
        :rules="[val => val.length > 0  || errorTypes.nuNumber,
        val => val.replace(/[^0-9]/g,'').length === 11
      || errorTypes.incompleteNumber]"
      ></q-input>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">E-mail</p>
      <q-input
        outlined
        no-error-icon
        type="email"
        v-model="emailD"
        @update:model-value="$emit('update:email', emailD)"
        placeholder="ivanov@mail.ru"
        :rules="[val => val.length > 0 || errorTypes.noEmail
         ,val => checkEmail(val) || errorTypes.wrongEmail]"
      ></q-input>
    </div>
    <div class="flex column col-grow">
      <p class="label mb-1">Город организатора</p>
      <q-select
        outlined
        no-error-icon
        v-model="cityD"
        @update:model-value="$emit('update:city', cityD)"
        use-input
        hide-selected
        fill-input
        input-debounce="300"
        :options="options"
        @filter="getCity"
        :rules="[() => !!cityD || errorTypes.noCity]"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>

</template>
<script>
import address from '@/api/address';
import { emailPattern } from '@/helpers/validatorPatterns';
import { errorTypesMain } from '@/helpers/errorTypes';

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
  methods: {
    async getCity(val, update) {
      const res = await address.getCity(val);
      update(() => {
        if (val === '') {
          this.options = res;
        } else {
          const needle = val.toLowerCase();
          this.options = res.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        }
      });
    },

    checkEmail(val) {
      return emailPattern.test(val);
    },
  },

};
</script>

<style scoped lang="scss">
.main-fields{
  gap: 20px;
}
</style>
