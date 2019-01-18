import ByItineraryAtFilterError from 'application/state/filter/error/ByItineraryAtFilterError';
import momentType from 'domain/types/momentType';
import Joi from 'joi';

class ByItineraryAtFilter {
  constructor(itineraryAt, periodStartAt, periodEndAt, interval) {
    this.itineraryAt = itineraryAt;
    this.periodStartAt = periodStartAt;
    this.periodEndAt = periodEndAt;
    this.interval = interval;

    this.isForecasting = this.isForecasting.bind(this);
  }

  static async fromRawValues(itineraryAt, periodStartAt, periodEndAt, interval) {
    await ByItineraryAtFilter.validate(itineraryAt, periodStartAt, periodEndAt, interval);

    return new ByItineraryAtFilter(itineraryAt, periodStartAt, periodEndAt, interval);
  }

  static async validate(itineraryAt, periodStartAt, periodEndAt, interval) {
    await ByItineraryAtFilter.validateType(itineraryAt, periodStartAt, periodEndAt, interval);
    await ByItineraryAtFilter.validateValues(itineraryAt, periodStartAt, periodEndAt);
  }

  static validateType(itineraryAt, periodStartAt, periodEndAt, interval) {
    return Joi.validate(
      {
        itineraryAt, periodStartAt, periodEndAt, interval,
      },
      Joi.object().keys({
        itineraryAt: momentType.required(),
        periodStartAt: momentType.required(),
        periodEndAt: momentType.required(),
        interval: Joi.string().required(),
      }),
    )
      .catch((validationError) => {
        throw ByItineraryAtFilterError.withInvalidTypeFilter(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }

  static validateValues(itineraryAt, periodStartAt, periodEndAt) {
    return Joi.validate(
      {
        itinerary: itineraryAt.clone().unix(),
        periodStart: periodStartAt.clone().unix(),
        periodEnd: periodEndAt.clone().unix(),
      },
      Joi.object().keys({
        periodStart: Joi.number(),
        periodEnd: Joi.number().min(Joi.ref('periodStart')),
        itinerary: Joi.number().min(Joi.ref('periodStart')).max((Joi.ref('periodEnd'))),
      }),
    )
      .catch((validationError) => {
        throw ByItineraryAtFilterError.withInvalidValueFilter(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }

  isForecasting() {
    return this.itineraryAt.isAfter() && this.periodEndAt.isAfter(this.periodStartAt);
  }
}

export default ByItineraryAtFilter;
