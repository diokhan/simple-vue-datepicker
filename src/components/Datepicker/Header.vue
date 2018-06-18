<template lang="pug">
  .datepicker-header
    .datepicker-header__column
      button.datepicker-header__button.datepicker-header__button--left(
        @click="$emit('go-back')" :disabled="!canGoBack"
      )
        font-awesome-icon(:icon="faChevronLeft")
      p.datepicker-header__month
        | {{ previousMonth }}
    .datepicker-header__column
      p.datepicker-header__month
        | {{ activeMonth }}
      button.datepicker-header__button.datepicker-header__button--right(
        @click="$emit('go-forward')" :disabled="!canGoForward"
      )
        font-awesome-icon(:icon="faChevronRight")
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import dateUtils from './dateUtils';

export default {
  name: 'DatepickerHeader',
  props: ['activeDate'],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faChevronLeft,
      faChevronRight,
    };
  },
  computed: {
    activeMomentDate() { return dateUtils.parseDate(this.activeDate); },
    previousMonth() {
      return dateUtils.formatMonth(this.activeMomentDate.clone().subtract(1, 'month'));
    },
    activeMonth() {
      return dateUtils.formatMonth(dateUtils.parseDate(this.activeDate));
    },
    canGoBack() {
      return this.activeMomentDate.diff(dateUtils.epochDate(), 'months') > 1;
    },
    canGoForward() {
      return dateUtils.currentDate().diff(this.activeMomentDate, 'months') !== 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/stylesheets/constants.scss';

.datepicker-header {
  display: flex;
  justify-content: space-between;

  &__column {
    width: 250px;
    position: relative;
  }

  &__button {
    position: absolute;
    top: 0;
    width: 30px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;

    &[disabled] {
      cursor: not-allowed;
      color: $disabled-color;

      &:hover {
        background-color: $white;
      }
    }

    &:hover {
      background-color: $hover-background-color;
    }

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  &__month {
    font-weight: $bold;
    text-align: center;
  }
}
</style>
