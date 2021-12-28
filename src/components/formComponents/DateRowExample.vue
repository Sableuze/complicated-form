<template>
  <div class="date-row example flex items-center">
    <div class="dates-col-wrapper start">
      <div class="date-col">
        <p class="label mb-1">Дата начала</p>
        <q-input
          outlined
          disable
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale"
                             transition-hide="scale">
                <q-date disable>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="date-col">
        <p class="label mb-1">Время начала</p>
        <q-input
          class="append-separator"
          outlined
          mask="time"
          disable
          :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="separator">
    </div>
    <div class="dates-col-wrapper finish">
      <div class="date-col">
        <p class="label mb-1">Дата окончания</p>
        <q-input
          outlined
          disable
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale"
                             transition-hide="scale">
                <q-date>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="date-col">
        <p class="label mb-1">Время окончания</p>
        <q-input
          outlined
          disable
          mask="time"
          :rules="['time']">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DateRowExample',
};
</script>

<style scoped lang="scss">
.example {
  background: transparent !important;

.separator {
  flex-grow: 1;
  width: 55px;
}}

</style>
