<template>
<div class="nothing" :style="`font-size: ${fz}px`">
  Здесь пока пусто...
</div>
</template>

<script>
export default {
  name: 'NothingMessage',
  props: {
    fz: {
      type: Number,
      default: 16,
    },
  },
};
</script>
