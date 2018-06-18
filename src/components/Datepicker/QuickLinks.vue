<template lang="pug">
  .datepicker-quick-links
    a.datepicker-quick-links__link(
      v-for="link in links"
      :type="link"
      :key="link"
      @click.prevent="handleClick"
    )
      | {{ formatLink(link) }}
</template>

<script>
import { camelCase } from 'lodash';
import strategies from './strategies';

const CURRENT_LINKS = Object.freeze([
  'today', 'this_week', 'this_month', 'this_quarter', 'this_year',
]);
const PREVIOUS_LINKS = Object.freeze([
  'last_week', 'last_month', 'last_quarter', 'last_year',
]);
const LINKS = Object.freeze(CURRENT_LINKS.concat(PREVIOUS_LINKS));

export default {
  name: 'DatepickerQuickLinks',
  data() {
    return {
      links: LINKS,
    };
  },
  methods: {
    formatLink(type) { return type.replace('_', ' '); },
    handleClick(e) {
      const type = e.currentTarget.getAttribute('type');
      const strategy = strategies[camelCase(type)];
      this.$emit('quick-link-clicked', strategy());
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../assets/stylesheets/constants.scss';

.datepicker-quick-links {
  height: 130px;
  border-top: $default-border;
  margin-top: 20px;
  padding: 10px 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: space-between;
  flex-wrap: wrap;

  &__link {
    width: 95px;
    height: 25px;
    padding: 5px;
    color: $link-color;
    font-size: $large-text;
    font-weight: $bold;
    text-transform: capitalize;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
