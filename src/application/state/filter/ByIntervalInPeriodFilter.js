import Joi from 'joi';

class ByIntervalInPeriodFilter {
  constructor(periodStart, periodEnd, interval) {
    ByIntervalInPeriodFilter.validate(periodStart, periodEnd, interval);

    this.periodStart = periodStart;
    this.periodEnd = periodEnd;
    this.interval = interval;
  }

  static fromRawValues(periodStart, periodEnd, interval) {
    return new this(periodStart, periodEnd, interval);
  }

  static validate(periodStart, periodEnd, interval) {
    Joi.assert({ periodStart, periodEnd, interval }, Joi.object().keys({
      periodStart: Joi.date().required(),
      periodEnd: Joi.date().greater(periodStart).required(),
      interval: Joi.string().required(),
    }));
  }
}

export default ByIntervalInPeriodFilter;
