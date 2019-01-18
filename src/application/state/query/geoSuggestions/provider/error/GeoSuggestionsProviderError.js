import ApplicationError from 'domain/errors/ApplicationError';

class GeoSuggestionsProviderError extends ApplicationError {
  static withInvalidResponseSchema(message) {
    return new this(message, 'Application Error: "GeoSuggestions" response is not valid.');
  }
}

export default GeoSuggestionsProviderError;
