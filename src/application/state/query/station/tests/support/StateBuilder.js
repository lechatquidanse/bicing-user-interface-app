import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';

class StateBuilder {
  constructor(station, isError, isFetching, error, isReduced) {
    this.station = station;
    this.isError = isError;
    this.isFetching = isFetching;
    this.error = error;
    this.isReduced = isReduced;

    this.withStation = this.withStation.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withError = this.withError.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this([
      StationBuilder.create().build(),
      false,
      false,
      undefined,
      false,
    ]);
  }

  withStation(station) {
    const copy = this.copy();
    copy.station = station;

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
    const data = this.isError === true ? this.error : this.station;

    const state = {
      data,
      error: this.isError,
      isFetching: this.isFetching,
      itineraryStep: this.itineraryStep,
    };

    return this.isReduced === true ? state : { query: { station: state } };
  }

  copy() {
    return new StateBuilder(
      this.station,
      this.isError,
      this.isFetching,
      this.error,
      this.isReduced,
    );
  }
}

export default StateBuilder;
