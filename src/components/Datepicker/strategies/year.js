import dateUtils from '../dateUtils';

const get = baseDate => (
  [dateUtils.formatDate(baseDate.startOf('year')), dateUtils.formatDate(baseDate.endOf('year'))]
);

export default {
  current() {
    return get.bind(this, dateUtils.currentDate());
  },
  previous() {
    return get.bind(this, dateUtils.currentDate().subtract(1, 'year'));
  },
};
