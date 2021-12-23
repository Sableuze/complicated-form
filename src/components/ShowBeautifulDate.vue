<template>
  <div>
    {{dateFormatted}}
  </div>
</template>

<script>
export default {
  name: 'showBeautifulDate',
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateFormatted() {
      const date = new Date(+this.date);

      let dayOfMonth = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      const diffMs = new Date() - date;
      const diffSec = Math.round(diffMs / 1000);
      const diffMin = diffSec / 60;
      const diffHour = diffMin / 60;

      // форматирование
      year = year.toString().slice(-2);
      month = month < 10 ? `0${month}` : month;
      dayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth;
      hour = hour < 10 ? `0${hour}` : hour;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      if (diffSec < 1) {
        return 'прямо сейчас';
      } if (diffMin < 1) {
        return `${Math.floor(diffSec)} сек. назад`;
      } if (diffHour < 1) {
        return `${Math.floor(diffMin)} мин. назад`;
      }
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
    },
  },
};
</script>

<style scoped>

</style>
