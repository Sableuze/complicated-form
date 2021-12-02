<template>
 <Custom-form :action="'create'">
   <template v-slot:title-first><h2>Информация об организаторе</h2></template>
   <template v-slot:title-second><h2>Общая информация</h2></template>
 </Custom-form>
</template>

<script>
import CustomForm from '@/components/CustomForm.vue';

export default {
  name: 'CreateEvent',
  components: {
    CustomForm,
  },
};
</script>

<style scoped>

</style>
