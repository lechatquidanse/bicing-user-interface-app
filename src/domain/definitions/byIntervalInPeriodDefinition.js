import moment from 'moment';

export const FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DEFAULT_PERIOD_START = moment().subtract(1, 'hour').format(FORMAT);
export const DEFAULT_PERIOD_END = moment().add(1, 'hour').format(FORMAT);
export const DEFAULT_INTERVAL = '5 min';
