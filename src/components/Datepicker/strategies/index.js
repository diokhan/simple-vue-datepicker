import today from './today';
import week from './week';
import month from './month';
import quarter from './quarter';
import year from './year';

// this whole thing looked like a prime example of
// strategy pattern. Although here it's something like
// a strategy factory but still.
export default {
  today,
  thisWeek: week.current,
  lastWeek: week.previous,
  thisMonth: month.current,
  lastMonth: month.previous,
  thisQuarter: quarter.current,
  lastQuarter: quarter.previous,
  thisYear: year.current,
  lastYear: year.previous,
};
