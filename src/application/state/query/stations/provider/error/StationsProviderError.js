import ApplicationError from 'domain/errors/ApplicationError';

class StationsProviderError extends ApplicationError {
  static withInvalidResponseSchema(message) {
    return new this(message, 'Application Error: "Stations" response is not valid.');
  }
}

export default StationsProviderError;
