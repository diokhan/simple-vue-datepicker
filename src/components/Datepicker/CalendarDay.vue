<template lang="pug">
  .calendar-day(
    :class="[state]"
    :disabled="this.state === 'disabled'"
    @click.prevent.stop="handleClick"
  )
    | {{ dateNumber }}
</template>

<script>
import { includes } from 'lodash';

export default {
  name: 'CalendarDay',
  props: {
    date: {
      required: true,
    },
    state: {
      required: true,
    },
  },
  data() {
    return {
      stateClass: this.state,
      dateNumber: this.date && this.date.date(),
    };
  },
  methods: {
    handleClick() {
      if (includes(['dummy', 'disabled'], this.state)) { return; }
      this.$emit('select-date', this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/constants.scss';

.calendar-day {
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  font-size: $small-text;
  font-weight: $bold;
  line-height: 35px;
  text-align: center;
  background-color: $white;
  color: $text-color;

  &.selectable, &.selected {
    cursor: pointer;
  }

  &.selectable {
    &:hover {
      background-color: $hover-background-color;
    }
  }

  &.selected {
    background-color: $dark-blue;
    color: $white;
  }

  &.in-range {
    background-color: $light-blue;
  }

  &[disabled] {
    color: $disabled-color;

    &:hover {
      background-color: $white;
      cursor: not-allowed;
    }
  }
}
</style>
