import ApplicationError from 'domain/errors/ApplicationError';

class ByItineraryGeoLocationFilterError extends ApplicationError {
  static withInvalidValueFilter(message) {
    return new this(message, 'Application Error: "GeoLocation" filter values must be valid.');
  }
}

export default ByItineraryGeoLocationFilterError;
