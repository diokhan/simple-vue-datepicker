<template lang="pug">
  .calendar
    // .calendar-legend
    //   span.calendar-legend__item(v-for="day in weekdays") {{ day }}
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
    monthMomentDate() { return dateUtils.parseDate(this.month); },
    days() {
      const startDate = this.monthMomentDate.clone().startOf('month');

      const arr = [...Array(this.monthMomentDate.daysInMonth()).keys()].map((dayNumber) => {
        const date = startDate.clone().add(dayNumber, 'days');
        return {
          date,
          state: this.getDayState(date),
          timestamp: date.valueOf(), // this serves as an unique key for iterations
        };
      });

      const weekday = startDate.day();
      const daysArray = [...Array(weekday).keys()].map(() => ({ date: null, state: 'dummy' })).concat(arr);
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

.calendar {
  display: flex;
  flex-direction: column;
}

.calendar-table {
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
