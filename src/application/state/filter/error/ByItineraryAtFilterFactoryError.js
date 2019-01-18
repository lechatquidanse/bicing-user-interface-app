import ApplicationError from 'domain/errors/ApplicationError';

class ByItineraryAtFilterFactoryError extends ApplicationError {
  static withInvalidType(message) {
    return new this(message, 'Application Error: "Itinerary At" types must be valid date.');
  }
}

export default ByItineraryAtFilterFactoryError;
