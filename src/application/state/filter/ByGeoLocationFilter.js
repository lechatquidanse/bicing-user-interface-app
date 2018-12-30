import Joi from 'joi';

class ByGeoLocationFilter {
  constructor(latitude, longitude, limit) {
    ByGeoLocationFilter.validate(latitude, longitude, limit);

    this.latitude = latitude;
    this.longitude = longitude;
    this.limit = limit;
  }

  static fromRawValues(latitude, longitude, limit) {
    return new this(latitude, longitude, limit);
  }

  static validate(latitude, longitude, limit) {
    Joi.assert({ latitude, longitude, limit }, Joi.object().keys({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      limit: Joi.number().min(0).max(10000).required(),
    }));
  }

  zoom() {
    if (this.limit < 1000) {
      return 15;
    }

    return 12;
  }
}

export default ByGeoLocationFilter;
