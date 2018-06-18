<template lang="pug">
  #app
    label.datepicker-label
      | {{ labelCopy }}
    Datepicker(v-model="dates")
</template>

<script>
import Datepicker from './components/Datepicker';

export default {
  name: 'App',
  components: {
    Datepicker,
  },
  data() {
    return {
      dates: {
        startDate: null,
        endDate: null,
      },
    };
  },
  computed: {
    labelCopy() {
      if (this.dates.startDate && this.dates.endDate) {
        return `${this.dates.startDate} - ${this.dates.endDate}`;
      }

      return 'No dates selected';
    },
  },
};
</script>

<style lang="scss">
@import './assets/stylesheets/constants.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.datepicker-label {
  font-weight: $bold;
  margin-bottom: 10px;
}
</style>
