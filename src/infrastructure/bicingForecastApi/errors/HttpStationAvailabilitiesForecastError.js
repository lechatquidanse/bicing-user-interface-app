import InfrastructureError from 'domain/errors/InfrastructureError';

class HttpStationAvailabilitiesForecastError extends InfrastructureError {
  static withUnexpectedResponseStatus(status) {
    return new this(
      `An error occurred during a Bicing station Forecast HTTP query returning a unexpected HTTP status: ${status}.`,
    );
  }

  static withRequestError(error) {
    return new this(
      `An error occurred during a Bicing station Forecast HTTP query returning: ${error}.`,
    );
  }
}

export default HttpStationAvailabilitiesForecastError;
