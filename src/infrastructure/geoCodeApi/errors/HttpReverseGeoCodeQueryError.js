import InfrastructureError from 'domain/errors/InfrastructureError';

class HttpReverseGeoCodeQueryError extends InfrastructureError {
  static withRequestError(error) {
    return new this(
      `An error occurred during a reverse GeoCode HTTP query returning: ${error}.`,
    );
  }
}

export default HttpReverseGeoCodeQueryError;
