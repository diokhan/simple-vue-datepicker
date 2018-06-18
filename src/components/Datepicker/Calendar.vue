<template lang="pug">
  .calendar
    .calendar-days-container
      table.calendar-table
        tr
          th.calendar-table__header(v-for="day in weekdays")
            | {{ day }}
        tr(v-for="(week, index) in days" :key="index")
          td.calendar-table__cell(v-for="day in week" :key="day.timestamp" :class="[day.state]")
            calendar-day(
              :date="day.date"
              :state="day.state"
              @select-date="handleDateClick"
            )
</template>

<script>
import moment from 'moment';
import { some } from 'lodash';
import CalendarDay from './CalendarDay';
import dateUtils from './dateUtils';
import constants from './constants';

const arrayOfNumbers = maxNumber => [...Array(maxNumber).keys()];

export default {
  name: 'Calendar',
  components: {
    CalendarDay,
  },
  props: ['month', 'selection'],
  data() {
    return {
      weekdays: constants.WEEKDAYS,
    };
  },
  computed: {
    monthStartDate() {
      return dateUtils.parseDate(this.month).clone().startOf('month');
    },
    days() {
      const daysArray = this.getDummyDays().concat(this.getActualDays());

      const daysByWeek = [];
      for (let i = 0; i < daysArray.length; i += 7) {
        daysByWeek.push(daysArray.slice(i, i + 7));
      }

      return daysByWeek;
    },
    selectionDates() {
      return this.selection.map(dateUtils.parseDate);
    },
  },
  methods: {
    getDummyDays() { // blank days in front of actual days
      return arrayOfNumbers(this.monthStartDate.day()).map(() => ({ state: 'dummy' }));
    },
    getActualDays() {
      return arrayOfNumbers(this.monthStartDate.daysInMonth())
        .map((dayNumber) => {
          const date = this.monthStartDate.clone().add(dayNumber, 'days');
          return {
            date,
            state: this.getDayState(date),
            timestamp: date.valueOf(), // this serves as an unique key for iterations
          };
        });
    },
    getDayState(date) {
      if (date.isAfter(moment(), 'day')) { return 'disabled'; }
      if (some(this.selectionDates, day => day.isSame(date, 'day'))) { return 'selected'; }
      if (this.selectionDates.length === 2 &&
        date.isAfter(this.selectionDates[0]) &&
        date.isBefore(this.selectionDates[1])
      ) return 'in-range';
      return 'selectable';
    },
    handleDateClick(date) {
      this.$emit('select-date', date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/constants.scss';

.calendar-table {
  // initially I wanted to do these element as flexbox
  // but I couldn't figure out clean enough way of handling borders
  border-collapse: collapse;
  border-spacing: 0px;

  &__header {
    font-size: $regular-text;
    font-weight: $bold;
  }

  &__cell {
    margin: 0;
    padding: 0;
    border: $default-border;

    &.dummy {
      border: none;
    }
  }
}

.calendar-legend {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &__item {
    width: 35px;
    text-align: center;
  }
}

.calendar-days-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
