import { DATE_TIME_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';
import Joi from 'joi';
import moment from 'moment';

class ByIntervalInPeriodFilter {
  constructor(periodStart, periodEnd, interval) {
    ByIntervalInPeriodFilter.validate(periodStart, periodEnd, interval);

    this.periodStart = periodStart;
    this.periodEnd = periodEnd;
    this.interval = interval;

    this.isForecasting = this.isForecasting.bind(this);
  }

  static fromRawValues(periodStart, periodEnd, interval) {
    return new this(periodStart, periodEnd, interval);
  }

  static validate(periodStart, periodEnd, interval) {
    Joi.assert({ periodStart, periodEnd, interval }, Joi.object().keys({
      periodStart: Joi.date().required(),
      periodEnd: Joi.date().greater(periodStart).allow(periodStart).required(),
      interval: Joi.string().required(),
    }));
  }

  isForecasting(itineraryAt) {
    return moment(this.periodEnd, DATE_TIME_FORMAT)
      .subtract(this.interval) > moment(itineraryAt, DATE_TIME_FORMAT);
  }
}

export default ByIntervalInPeriodFilter;
