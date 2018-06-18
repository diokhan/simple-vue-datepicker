import dateUtils from '../dateUtils';

const get = baseDate => (
  [dateUtils.formatDate(baseDate.startOf('month')), dateUtils.formatDate(baseDate.endOf('month'))]
);

export default {
  current() {
    return get(dateUtils.currentDate());
  },
  previous() {
    return get(dateUtils.currentDate().subtract(1, 'month'));
  },
};
