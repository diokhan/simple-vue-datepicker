import dateUtils from '../dateUtils';

const formatOutput = date => [date, date];

export default () => (
  formatOutput(dateUtils.currentDateString())
);
