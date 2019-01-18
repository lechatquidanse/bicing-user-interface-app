import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';

class ItineraryStepBuilder {
  constructor(filter, isError, error, itineraryStep) {
    this.filter = filter;
    this.isError = isError;
    this.error = error;
    this.itineraryStep = itineraryStep;

    this.withFilter = this.withFilter.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withError = this.withError.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static async create() {
    const filter = await ByItineraryGeoLocationFilterBuilder.create().build();

    return new this(filter, false, undefined, 0);
  }

  withFilter(filter) {
    const copy = this.copy();
    copy.filter = filter;

    return copy;
  }

  withIsError(isError) {
    const copy = this.copy();
    copy.isError = isError;

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
    const data = this.isError === true ? this.error : this.filter;

    return {
      data,
      error: this.isError,
      itineraryStep: this.itineraryStep,
    };
  }

  copy() {
    return new ItineraryStepBuilder(this.filter, this.isError, this.error, this.itineraryStep);
  }
}

export default ItineraryStepBuilder;
