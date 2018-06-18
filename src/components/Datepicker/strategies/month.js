import dateUtils from '../dateUtils';

const get = baseDate => (
  [dateUtils.formatDate(baseDate.startOf('month')), dateUtils.formatDate(baseDate.endOf('month'))]
);

export default {
  current() {
    return get.bind(this, dateUtils.currentDate());
  },
  previous() {
    return get.bind(this, dateUtils.currentDate().subtract(1, 'month'));
  },
};
