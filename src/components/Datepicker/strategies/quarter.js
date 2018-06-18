import dateUtils from '../dateUtils';

const get = (baseDate) => {
  const month = baseDate.month();
  const quarter = Math.floor(month / 3);
  const startDate = baseDate.startOf('year').add(quarter * 3, 'months').startOf('month');
  const endDate = startDate.clone().add(2, 'months').endOf('month');
  return [startDate, endDate].map(dateUtils.formatDate);
};

export default {
  current() {
    return get.bind(this, dateUtils.currentDate());
  },
  previous() {
    return get.bind(this, dateUtils.currentDate().subtract(3, 'months'));
  },
};
