<template>
  <div class="errors-list">
    <p class="error"
       v-for="(error, index) in errorsFormatted" :key="index">
      - {{ error }}
    </p>
  </div>

</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'apiErrors',
  props: {
    errorCodes: {
      type: Array,
      default() {
        return [];
      },
    },
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    const tl = gsap.timeline({ repeatDelay: 0.3 });
    document.querySelectorAll('.error').forEach((i) => {
      tl.fromTo(i, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    });
  },
  computed: {
    errorsFormatted() {
      return [...this.errorCodes.map((i) => this.source[i])];
    },
  },
};
</script>

<style scoped lang="scss">
.errors-list {
  text-align: left;
  font-size: 12px;
  color: red;
  font-weight: 600;
}
</style>
