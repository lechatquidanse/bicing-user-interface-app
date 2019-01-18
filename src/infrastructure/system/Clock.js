import moment from 'moment';
import { DATE_TIME_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';

class Clock {
  static nowDateTimeFormatted() {
    return moment().format(DATE_TIME_FORMAT);
  }
}

export default Clock;
