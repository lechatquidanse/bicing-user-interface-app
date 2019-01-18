import AvailabilityBuilder from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';

class StateBuilder {
  constructor(stationAvailabilities, isError, isFetching, error, isReduced) {
    this.stationAvailabilities = stationAvailabilities;
    this.isError = isError;
    this.isFetching = isFetching;
    this.error = error;
    this.isReduced = isReduced;

    this.withStationAvailabilities = this.withStationAvailabilities.bind(this);
    this.withNoStationAvailabilities = this.withNoStationAvailabilities.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withError = this.withError.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this([
      [AvailabilityBuilder.create().build(), AvailabilityBuilder.create().build()],
      false,
      false,
      undefined,
      false,
    ]);
  }

  withStationAvailabilities(...stationAvailabilities) {
    const copy = this.copy();
    copy.stationAvailabilities = stationAvailabilities;

    return copy;
  }

  withNoStationAvailabilities() {
    const copy = this.copy();
    copy.stationAvailabilities = undefined;

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
    const data = this.isError === true ? this.error : this.stationAvailabilities;

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
      this.stationAvailabilities,
      this.isError,
      this.isFetching,
      this.error,
      this.isReduced,
    );
  }
}

export default StateBuilder;
