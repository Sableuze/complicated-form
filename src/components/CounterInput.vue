<template>
  <div>
    <input
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CounterInput',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>

</style>
