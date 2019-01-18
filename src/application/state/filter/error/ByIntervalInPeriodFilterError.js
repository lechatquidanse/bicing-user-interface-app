import ApplicationError from 'domain/errors/ApplicationError';

class ByIntervalInPeriodFilterError extends ApplicationError {
  static withInvalidTypeFilter(message) {
    return new this(message, 'Application Error: "Interval in Period" types must be valid.');
  }

  static withInvalidValueFilter(message) {
    return new this(message, 'Application Error: "Interval in Period" values must be valid.');
  }
}

export default ByIntervalInPeriodFilterError;
