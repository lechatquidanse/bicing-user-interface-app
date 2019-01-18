import ApplicationError from 'domain/errors/ApplicationError';

class StationProviderError extends ApplicationError {
  static withInvalidResponseSchema(message) {
    return new this(message, 'Application Error: "Station" response is not valid.');
  }
}

export default StationProviderError;
