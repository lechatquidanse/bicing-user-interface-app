import ApplicationError from 'domain/errors/ApplicationError';

class ByItineraryAtFilterError extends ApplicationError {
  static withInvalidTypeFilter(message) {
    return new this(message, 'Application Error: "Itinerary At" types must be valid.');
  }

  static withInvalidValueFilter(message) {
    return new this(message, 'Application Error: "Itinerary At" values must be valid.');
  }
}

export default ByItineraryAtFilterError;
