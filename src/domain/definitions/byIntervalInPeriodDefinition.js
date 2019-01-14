import moment from 'moment';

export const FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_PERIOD_START = moment().subtract(1, 'hour').format(FORMAT);
export const DEFAULT_PERIOD_END = moment().add(1, 'hour').format(FORMAT);
export const DEFAULT_INTERVAL = '5 min';
export const DEFAULT_INTERVAL_AVAILABILITIES = '5T';
export const DEFAULT_TIME_FORMAT = 'HH:mm';
export const DEFAULT_TIME_INTERVAL = 5;

const defaultInputDateSelectNumberDay = 7;
export const defaultInputDateSelectOptions = () => Array.from(
  Array(defaultInputDateSelectNumberDay).keys(),
).map((day) => {
  const date = moment().add(day, 'days');
  return {
    label: date.calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      sameElse: 'dddd',
    }),
    value: date.format(DATE_FORMAT),
  };
});
export const DEFAULT_INPUT_DATE_SELECT_OPTIONS = defaultInputDateSelectOptions();
