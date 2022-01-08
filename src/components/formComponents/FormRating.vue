<template>
  <div class="flex column">
    <p class="label mb-1">Рейтинг мероприятия</p>
    <q-select
      outlined
      v-model="ratingD"
      @update:model-value="updateRating(ratingD)"
      :options="ratingTitles"
      :rules="[(val) => val.length || errorTypes.noRating]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { errorTypesRating } from '@/helpers/validation/errorTypes';

export default {
  name: 'Rating',
  props: {
    rating: {
      type: Object,
      default() {
        return {
          title: '16+',
          id: 0,
        };
      },
    },
  },
  emits: ['update:rating'],
  created() {},
  mounted() {
    this.errorTypes = errorTypesRating;
    // eslint-disable-next-line no-new
    new Promise(() => {
      this.$store.dispatch('loadRating').then(() => {
        this.ratingTitles = this.getRatingList.map((i) => i.title);
      });
    });
  },
  computed: {
    ...mapGetters(['getRatingList']),
  },
  data() {
    return {
      ratingD: this.rating.title || '',
      errorTypes: '',
      ratingTitles: '',
    };
  },
  methods: {
    updateRating(ratingTitle) {
      const ratingItem = this.getRatingList.find((i) => i.title === ratingTitle);
      this.$emit('update:rating', ratingItem);
    },
  },
};
</script>

<style scoped></style>
