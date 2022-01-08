<template>
  <div class="event" v-if="theEvent">
    <div class="event-body flex">
      <div class="event-info-wrapper">
        <div class="event-info flex column">
          <div class="rating-cnt onBig">
            <p class="rating">{{ theEvent.rating?.title }}</p>
          </div>
          <div class="title-cnt">
            <div class="rating-cnt onSmall">
              <p class="rating">{{ theEvent.rating?.title }}</p>
            </div>

            <h1 class="title-big">{{ theEvent.name }}</h1>
          </div>
          <div class="info-body flex column">
            <div class="regular-info-cnt">
              <div class="list-item">
                <q-icon class="icon" name="place"/>
                <p class="list-text">
                  {{ `${theEvent.city}, ${theEvent.address?.street}` }} <br/>{{
                    `${theEvent.address?.house}`
                  }}
                </p>
              </div>
              <div class="date-row" v-for="dateRow in theEvent.dates" :key="dateRow.id">
                <div class="list-item">
                  <q-icon class="icon" color="accent" name="date_range"/>
                  <p class="list-text">{{ `${dateRow.dateStart}, ${dateRow.dateFinish}` }}</p>
                </div>
                <div class="list-item">
                  <q-icon class="icon" color="accent" name="schedule"/>
                  <p class="list-text">{{ `${dateRow.timeStart}, ${dateRow.timeFinish}` }}</p>
                </div>
              </div>
            </div>
            <div class="contacts-cnt">
              <div class="list-item">
                <q-icon class="icon" name="phone"/>
                <p class="list-text">{{ theEvent.number }}</p>
              </div>
              <div class="list-item">
                <q-icon class="icon" name="email"/>
                <p class="list-text">{{ theEvent.email }}</p>
              </div>
            </div>
            <div class="holder-info">
              <h2 class="holder label">{{ theEvent.holder }}</h2>
              <p class="hint">Организатор мероприятия</p>
            </div>
          </div>
        </div>
      </div>
      <div class="event-picture">
        <img :src="theEvent.picture" alt="preview picture"/>
      </div>
    </div>
    <div class="event-description">
      <p class="description">{{ theEvent.description }}</p>
    </div>
  </div>
  <div class="event-skeleton" v-else>
    <div class="event-body flex">
      <div class="event-info-wrapper">
        <div class="event-info flex column">
          <q-skeleton class="rating-cnt"></q-skeleton>
          <q-skeleton class="title-cnt" width="440" height="92"></q-skeleton>
          <div class="info-body flex column">
            <div class="regular-info-cnt">
              <q-skeleton class="list-item" width="440" height="68"></q-skeleton>
              <q-skeleton class="list-item" width="440" height="68"></q-skeleton>
              <q-skeleton class="list-item" width="440" height="68"></q-skeleton>
            </div>
            <div class="contacts-cnt">
              <q-skeleton class="list-item" width="440" height="35"></q-skeleton>
              <q-skeleton class="list-item" width="440" height="35"></q-skeleton>
            </div>
            <div class="holder-info">
              <q-skeleton class="list-item" width="440" height="35"></q-skeleton>
            </div>
          </div>
        </div>
      </div>
      <q-skeleton class="event-picture"></q-skeleton>
    </div>
    <q-skeleton class="event-description" height="100px"></q-skeleton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { reformatDates } from '../helpers/reformatDatesHelper';

const cloneDeep = require('lodash.clonedeep');

export default {
  name: 'EventShowcase',
  props: {
    eventId: {
      type: String,
    },
  },
  mounted() {
    const theEvent = cloneDeep(this.getEventById(this.eventId));
    if (theEvent) {
      theEvent.dates = reformatDates(theEvent.dates, this.toReformatDate);
      this.theEvent = theEvent;
    } else {
      // eslint-disable-next-line no-new
      // const promise = new Promise(() =>
      // this.fetchSeparateEvent({ query: `id == "${this.eventId}"` }));
      this.fetchSeparateEvent({ query: `id == "${this.eventId}"` })
        .then(({ records }) => {
          if (records.length) {
            const event = records.find((i) => i.id === this.eventId);
            event.dates = reformatDates(event.dates, this.toReformatDate);
            this.theEvent = event;
          } else this.$router.push({ name: 'Home' });
        }, () => this.$router.push({ name: 'Home' }));
    }
  },
  computed: {
    ...mapGetters(['getEventById']),
  },
  data() {
    return {
      toReformatDate: 'DD MMM yyyy',
      theEvent: '',
    };
  },
  methods: {
    ...mapActions(['fetchSeparateEvent']),
  },
};
</script>

<style scoped lang="scss">
p {
  margin: 0;
}

.event-body {
  display: flex;
  padding: 40px;
  justify-content: space-between;

  .event-info-wrapper {
    flex: 30%;
    max-width: 500px;
  }

  .event-info {
    display: grid;
    gap: 10px;
    grid-template-columns: 50px 1fr;
    justify-content: center;
    align-items: baseline;

    .rating-cnt {
      grid-row: span 5;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $close-bg;
      color: #ffffff;
      width: 48px;
      height: 48px;
    }

    .title-cnt {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .onSmall {
      display: none;
    }

    .title-big {
      font-size: 32px;
      line-height: 39px;
      margin-bottom: 32px;
      font-weight: 800;
      color: $close-bg;
    }

    .info-body {
      gap: 22px;

      .regular-info-cnt {
        .list-text {
          font-size: 18px;
        }
      }

      .date-row {
        padding: 20px 0 14px 0;
        border-bottom: 1px solid red
      }

      .contacts-cnt {
        .list-text {
          font-size: 14px;
        }
      }

      .holder-info {
        .holder {
          margin: 0;
          line-height: 1rem;
        }

        .hint {
          color: $hint-color-holder;
          margin-top: 6px;
          text-indent: 4px;
          font-size: 10px;
        }
      }

      .list-item {
        display: flex;
        gap: 6px;
        align-items: center;
        padding-bottom: 14px;

        &:last-child {
          padding-bottom: 0;
        }

        .icon {
          color: $border-color;
          font-size: 18px;
        }

        .list-text {
          color: $label-color;
          opacity: 0.6;
        }
      }
    }
  }

  .event-picture {
    flex: 70%;
    display: flex;
    justify-content: center;
    max-width: 630px;
    max-height: 420px;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .event-info {
      display: flex;
      flex-direction: column;
    }
    .onBig {
      display: none !important;
    }
    .onSmall {
      display: flex !important;
    }
    .hint {
      font-size: 14px !important;
    }
  }
  @media (max-width: 650px) {
    //event body
    padding: 10px;
  }
}

.event-description {
  margin-top: 24px;
  text-align: center;

  .description {
    color: $label-color;
  }
}
</style>
