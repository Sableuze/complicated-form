import moment from 'moment';
// eslint-disable-next-line import/prefer-default-export
export const formatDates = (data) => {
  data.forEach((dateItem) => {
    Object.entries(dateItem).forEach(([key, value]) => {
      if (key === 'dateStart' || key === 'dateFinish') {
        dateItem[key] = moment(value, 'DD/MM/YYYY').format('X');
      }
      if (key === 'timeStart' || key === 'timeFinish') {
        dateItem[key] = moment(value, 'HH:mm').format('X');
        debugger;
      }
    });
  });
  return data;
};
export const reformatDates = (data, toReformatDate) => {
  data.forEach((dateItem) => {
    Object.entries(dateItem).forEach(([key, value]) => {
      if (key === 'dateStart' || key === 'dateFinish') {
        dateItem[key] = moment(value, 'X').format(toReformatDate);
      }
      if (key === 'timeStart' || key === 'timeFinish') {
        dateItem[key] = moment(value, 'X').format('HH:mm');
      }
    });
  });
  return data;
};
