import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';

class ItineraryStepBuilder {
  constructor(availabilities, isError, isFetching, error, itineraryStep) {
    this.availabilities = availabilities;
    this.isError = isError;
    this.isFetching = isFetching;
    this.error = error;
    this.itineraryStep = itineraryStep;

    this.withAvailabilities = this.withAvailabilities.bind(this);
    this.withNoAvailabilities = this.withNoAvailabilities.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withError = this.withError.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this([AvailabilityBuilder.create().build()], false, false, undefined, 0);
  }

  withAvailabilities(...availabilities) {
    const copy = this.copy();
    copy.availabilities = availabilities;

    return copy;
  }

  withNoAvailabilities() {
    const copy = this.copy();
    copy.availabilities = undefined;

    return copy;
  }

  withIsError(isError) {
    const copy = this.copy();
    copy.isError = isError;

    return copy;
  }

  withIsFetching(isFetching) {
    const copy = this.copy();
    copy.isFetching = isFetching;

    return copy;
  }

  withError(error) {
    const copy = this.copy();
    copy.error = error;

    return copy;
  }

  withItineraryStep(itineraryStep) {
    const copy = this.copy();
    copy.itineraryStep = itineraryStep;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.availabilities;

    return {
      data,
      error: this.isError,
      isFetching: this.isFetching,
      itineraryStep: this.itineraryStep,
    };
  }

  copy() {
    return new ItineraryStepBuilder(
      this.availabilities,
      this.isError,
      this.isFetching,
      this.error,
      this.itineraryStep,
    );
  }
}

export default ItineraryStepBuilder;
