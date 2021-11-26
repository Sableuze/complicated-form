<template>
 <Form :action="'create'">
   <template v-slot:title-first><h2>Информация об организаторе</h2></template>
   <template v-slot:title-second><h2>Общая информация</h2></template>
 </Form>
</template>

<script>
import Form from '@/components/Form.vue';

export default {
  name: 'CreateEvent',
  components: {
    Form,
  },
};
</script>

<style scoped>

</style>
