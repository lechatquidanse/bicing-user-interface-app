import ApplicationError from 'domain/errors/ApplicationError';

class AvailabilitiesProviderError extends ApplicationError {
  static withInvalidResponseSchema(message) {
    return new this(message, 'Application Error: "Availabilities" response is not valid.');
  }
}

export default AvailabilitiesProviderError;
