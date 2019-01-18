import ByIntervalInPeriodFilterError
  from 'application/state/filter/error/ByIntervalInPeriodFilterError';
import momentType from 'domain/types/momentType';
import Joi from 'joi';
import moment from 'moment';

class ByIntervalInPeriodFilter {
  constructor(periodStartAt, periodEndAt, interval) {
    this.periodStartAt = periodStartAt;
    this.periodEndAt = periodEndAt;
    this.interval = interval;
  }

  static async fromRawValues(periodStartAt, periodEndAt, interval) {
    await ByIntervalInPeriodFilter.validate(periodStartAt, periodEndAt, interval);

    return new ByIntervalInPeriodFilter(periodStartAt, periodEndAt, interval);
  }

  static async validate(periodStartAt, periodEndAt, interval) {
    await ByIntervalInPeriodFilter.validateType(periodStartAt, periodEndAt, interval);
    await ByIntervalInPeriodFilter.validateValues(periodStartAt, periodEndAt);
  }

  static validateType(periodStartAt, periodEndAt, interval) {
    return Joi.validate(
      { periodStartAt, periodEndAt, interval },
      Joi.object().keys({
        periodStartAt: momentType.required(),
        periodEndAt: momentType.required(),
        interval: Joi.string().required(),
      }),
    )
      .catch((validationError) => {
        throw ByIntervalInPeriodFilterError.withInvalidTypeFilter(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }

  static validateValues(periodStartAt, periodEndAt) {
    return Joi.validate(
      {
        periodStart: periodStartAt.clone().unix(),
        periodEnd: periodEndAt.clone().unix(),
      },
      Joi.object().keys({
        periodStart: Joi.number().max(moment().unix()),
        periodEnd: Joi.number().min(Joi.ref('periodStart')),
      }),
    )
      .catch((validationError) => {
        throw ByIntervalInPeriodFilterError.withInvalidValueFilter(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }
}

export default ByIntervalInPeriodFilter;
