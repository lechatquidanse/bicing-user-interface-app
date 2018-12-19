import InfrastructureError from 'domain/errors/InfrastructureError';

class HttpAvailabilityQueryError extends InfrastructureError {
  static withUnexpectedResponseStatus(status) {
    return new this(
      `An error occured during a bicing availabilities HTTP query returning a unexpected HTTP status: ${status}.`,
    );
  }

  static withRequestError(error) {
    return new this(
      `An error occured during a bicing availabilities HTTP query returning an HTTP error: ${error}.`,
    );
  }
}

export default HttpAvailabilityQueryError;
