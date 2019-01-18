import { DEFAULT_LIMIT, DEFAULT_ZOOM, ZOOM } from 'domain/definitions/configurationMapDefinition';
import Joi from 'joi';
import ByItineraryGeoLocationFilterError from 'application/state/filter/error/ByItineraryGeoLocationFilterError';

// @todo add restrictions to barcelona area
class ByItineraryGeoLocationFilter {
  constructor(latitude, longitude, limit) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.limit = limit;
  }

  static async fromRawValues(latitude, longitude, limit) {
    await ByItineraryGeoLocationFilter.validate(latitude, longitude, limit);

    return new ByItineraryGeoLocationFilter(latitude, longitude, limit);
  }

  static async validate(latitude, longitude, limit) {
    await Joi.validate(
      { latitude, longitude, limit },
      Joi.object().keys({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        limit: Joi.number().min(0).max(10000).required(),
      }),
    )
      .catch((validationErrors) => {
        throw ByItineraryGeoLocationFilterError.withInvalidValueFilter(
          validationErrors.details.map(d => d.message).toString(),
        );
      });
  }

  zoom() {
    if (this.limit < DEFAULT_LIMIT) {
      return ZOOM;
    }

    return DEFAULT_ZOOM;
  }
}

export default ByItineraryGeoLocationFilter;
