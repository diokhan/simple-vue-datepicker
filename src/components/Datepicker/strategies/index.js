import today from './today';
import week from './week';
import month from './month';
import quarter from './quarter';
import year from './year';

export default {
  today,
  thisWeek: week.current(),
  lastWeek: week.previous(),
  thisMonth: month.current(),
  lastMonth: month.previous(),
  thisQuarter: quarter.current(),
  lastQuarter: quarter.previous(),
  thisYear: year.current(),
  lastYear: year.previous(),
};
