import dateUtils from '../dateUtils';

const get = (baseDate) => {
  const startDate = dateUtils.formatDate(baseDate.startOf('week'));
  const endDate = dateUtils.formatDate(baseDate.endOf('week'));
  return [startDate, endDate];
};

export default {
  current() {
    return get(dateUtils.currentDate());
  },
  previous() {
    return get(dateUtils.currentDate().subtract(1, 'week'));
  },
};
