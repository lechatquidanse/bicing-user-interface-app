import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';

class StateBuilder {
  constructor(filter, isError, error, isReduced) {
    this.filter = filter;
    this.isError = isError;
    this.error = error;

    this.isReduced = isReduced;

    this.withFilter = this.withFilter.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withError = this.withError.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static async create() {
    const filter = await ByItineraryGeoLocationFilterBuilder.create().build();

    return new this(filter, false, undefined, false);
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

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.filter;
    const state = { data, error: this.isError };

    return this.isReduced === true ? state : { command: { storeItineraryAt: state } };
  }

  copy() {
    return new StateBuilder(this.filter, this.isError, this.error, this.isReduced);
  }
}

export default StateBuilder;
