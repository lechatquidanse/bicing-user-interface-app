import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';

class StateBuilder {
  constructor(geoSuggestions, isError, isFetching, error, isReduced) {
    this.geoSuggestions = geoSuggestions;
    this.isError = isError;
    this.isFetching = isFetching;
    this.error = error;
    this.isReduced = isReduced;

    this.withGeoSuggestions = this.withGeoSuggestions.bind(this);
    this.withNoGeoSuggestions = this.withNoGeoSuggestions.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withError = this.withError.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this([
      [StationBuilder.create().build(), StationBuilder.create().build],
      false,
      false,
      undefined,
      false,
    ]);
  }

  withGeoSuggestions(...geoSuggestions) {
    const copy = this.copy();
    copy.geoSuggestions = geoSuggestions;

    return copy;
  }

  withNoGeoSuggestions() {
    const copy = this.copy();
    copy.geoSuggestions = undefined;

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

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.geoSuggestions;

    const state = {
      data,
      error: this.isError,
      isFetching: this.isFetching,
      itineraryStep: this.itineraryStep,
    };

    return this.isReduced === true ? state : { query: { geoSuggestions: state } };
  }

  copy() {
    return new StateBuilder(
      this.geoSuggestions,
      this.isError,
      this.isFetching,
      this.error,
      this.isReduced,
    );
  }
}

export default StateBuilder;
