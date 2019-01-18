import ApplicationError from 'domain/errors/ApplicationError';

class StationAvailabilitiesProviderError extends ApplicationError {
  static withInvalidResponseSchema(message) {
    return new this(message, 'Application Error: "Station Availabilities" response is not valid.');
  }
}

export default StationAvailabilitiesProviderError;
