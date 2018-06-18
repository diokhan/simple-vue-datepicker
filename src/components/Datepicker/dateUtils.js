import moment from 'moment';
import constants from './constants';

export default {
  formatDate(momentDate) {
    return momentDate.format(constants.LONG_DATE_FORMAT);
  },
  formatMonth(momentDate) {
    return momentDate.format(constants.SHORT_DATE_FORMAT);
  },
  parseDate(dateString) {
    return moment(dateString, constants.LONG_DATE_FORMAT);
  },
  parseMonth(monthString) {
    return moment(monthString, constants.SHORT_DATE_FORMAT);
  },
  sortDates(arrayOfDates) {
    return arrayOfDates
      .map(this.parseDate)
      .sort((a, b) => a.diff(b))
      .map(this.formatDate);
  },
  currentDate() { return moment(); },
  epochDate: moment(0),
  currentDateString() { return this.formatDate(this.currentDate()); },
  currentEpochString() { return this.formatDate(this.epochDate); },
  subtractMonth(dateString) { return this.parseDate(dateString).clone().subtract(1, 'month'); },
  addMonth(dateString) { return this.parseDate(dateString).clone().add(1, 'month'); },
};
