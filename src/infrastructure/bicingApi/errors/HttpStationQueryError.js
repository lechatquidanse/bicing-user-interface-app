import InfrastructureError from 'domain/errors/InfrastructureError';

class HttpStationQueryError extends InfrastructureError {
  static withUnexpectedResponseStatus(status) {
    return new this(
      `An error occurred during a Bicing stations HTTP query returning a unexpected HTTP status: ${status}.`,
    );
  }

  static withResponseFormatValidationErrors(errors) {
    return new this(
      `An error occurred during a Bicing stations HTTP query returning a unexpected HTTP response format: ${errors}.`,
    );
  }

  static withRequestError(error) {
    return new this(
      `An error occurred during a Bicing stations HTTP query returning: ${error}.`,
    );
  }
}

export default HttpStationQueryError;
