<template lang="pug">
  .datepicker
    datepicker-header(
      :activeDate="activeMonth"
      @go-back="handleGoBack"
      @go-forward="handleGoForward"
    )
    .calendars
      calendar(
        v-for="month in [previousMonth, activeMonth]"
        :month="month"
        :selection="selection"
        :key="month"
        @select-date="handleDateSelect"
      )
    quick-links(
      @quick-link-clicked="handleQuickLinkClicked"
    )
</template>

<script>
import DatepickerHeader from './Header';
import Calendar from './Calendar';
import QuickLinks from './QuickLinks';
import dateUtils from './dateUtils';

export default {
  name: 'Datepicker',
  components: {
    DatepickerHeader,
    Calendar,
    QuickLinks,
  },
  props: ['value'],
  data() {
    return {
      startDate: this.value.startDate,
      endDate: this.value.endDate,
      activeMonth: this.value.endDate || dateUtils.currentDateString(),
      selection: [this.value.startDate, this.value.endDate],
    };
  },
  computed: {
    leftMonth() { return dateUtils.formatDate(dateUtils.subtractMonth(this.activeMonth)); },
    sortedSelection() { return dateUtils.sortDates(this.selection); },
    previousMonth() {
      return dateUtils.formatDate(dateUtils.subtractMonth(this.activeMonth));
    },
    selectionDates() { return this.selection.map(dateUtils.parseDate); },
  },
  methods: {
    handleGoBack() {
      this.activeMonth = dateUtils.formatDate(dateUtils.subtractMonth(this.activeMonth));
    },
    handleGoForward() {
      this.activeMonth = dateUtils.formatDate(dateUtils.addMonth(this.activeMonth));
    },
    handleDateSelect(date) {
      const formattedDate = dateUtils.formatDate(date);
      if (this.selection.length < 2) {
        this.selection = dateUtils.sortDates(this.selection.concat([formattedDate]));
      } else {
        this.selection = [formattedDate];
      }

      this.emitSelectionChange();
    },
    handleQuickLinkClicked(dates) {
      this.selection = dates;

      // Don't select future dates
      if (dateUtils.parseDate(this.selection[1]).isAfter(dateUtils.currentDate())) {
        this.selection[1] = dateUtils.currentDateString();
      }

      this.activeMonth = this.selection[1];
      this.emitSelectionChange();
    },
    emitSelectionChange() {
      if (this.selection.length === 2) {
        this.$emit('input', {
          startDate: dateUtils.formatDate(this.selectionDates[0]),
          endDate: dateUtils.formatDate(this.selectionDates[1]),
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/stylesheets/constants.scss';

.datepicker {
  background-color: $white;
  width: 550px;
  height: 425px;
  padding: 10px 20px 0;
  border: $default-border;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.calendars {
  height: 320px;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
