<template>
  <div class="home">
    <div class="lists">
      <div class="draft"><h2 class="title">В черновике :</h2>
        <Draft-list></Draft-list>
      </div>
      <div class="suggested">
        <h2 class="title title-suggested">На модерации :</h2>
        <Suggested-list></Suggested-list>
      </div>
    </div>
    <q-btn
      size="lg"
      padding="md"
      class="label self-center"
      color="accent"
      @click="this.$router.push({name: 'CreateEvent'})">
      Создать мероприятие
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DraftList from '@/components/DraftList.vue';
import SuggestedList from '@/components/SuggestedList.vue';

export default {
  name: 'Home',
  components: { DraftList, SuggestedList },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    onSubmit() {
    },
    onReset() {
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lists {
  display: flex;
  justify-content: space-around;
  min-height: 300px;
  > div {
    flex: 1;
    max-width: 350px
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    > div {
      width: 100%;
      max-width: unset;
    }
  }
  }

.title-suggested {
  color: green;
}
</style>
