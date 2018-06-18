import dateUtils from '../dateUtils';

const get = baseDate => (
  [dateUtils.formatDate(baseDate.startOf('year')), dateUtils.formatDate(baseDate.endOf('year'))]
);

export default {
  current() {
    return get(dateUtils.currentDate());
  },
  previous() {
    return get(dateUtils.currentDate().subtract(1, 'year'));
  },
};
