import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import {
  DURATION_INTERVAL,
  DURATION_TO_PERIOD_END,
  DURATION_TO_PERIOD_START,
  INTERVAL,
} from 'domain/definitions/byItinererayAtDefinition';
import momentType from 'domain/types/momentType';
import moment from 'moment';
import ByItineraryAtFilterFactoryError from 'application/state/filter/error/ByItineraryAtFilterFactoryError';

class ByItineraryAtFilterFactory {
  static async create(itineraryAt) {
    return ByItineraryAtFilterFactory.fromItineraryAt(await ByItineraryAtFilterFactory.validate(
      itineraryAt,
    ));
  }

  static fromItineraryAt(itineraryAt) {
    return ByItineraryAtFilter.fromRawValues(
      itineraryAt,
      ByItineraryAtFilterFactory.periodStartAtFromItineraryAt(itineraryAt),
      ByItineraryAtFilterFactory.periodEndAtFromItineraryAt(itineraryAt),
      INTERVAL,
    );
  }

  static async validate(itineraryAt) {
    return momentType.validate(itineraryAt)
      .then(itineraryAt)
      .catch((validationError) => {
        throw ByItineraryAtFilterFactoryError.withInvalidType(
          validationError.details.map(d => d.message).toString(),
        );
      });
  }

  static isForecasting(itineraryAt) {
    return itineraryAt > moment().add(DURATION_INTERVAL);
  }

  static periodStartAtFromItineraryAt(itineraryAt) {
    if (ByItineraryAtFilterFactory.isForecasting(itineraryAt) === false) {
      return itineraryAt.clone();
    }

    return itineraryAt.clone().subtract(DURATION_TO_PERIOD_START);
  }

  static periodEndAtFromItineraryAt(itineraryAt) {
    if (ByItineraryAtFilterFactory.isForecasting(itineraryAt) === false) {
      return itineraryAt.clone();
    }

    return itineraryAt.clone().add(DURATION_TO_PERIOD_END);
  }
}

export default ByItineraryAtFilterFactory;
