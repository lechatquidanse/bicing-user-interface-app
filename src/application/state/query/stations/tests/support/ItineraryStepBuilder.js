import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LIMIT,
  DEFAULT_LONGITUDE,
} from 'domain/definitions/configurationMapDefinition';

class ItineraryStepBuilder {
  constructor(
    stations,
    isError,
    isFetching,
    itineraryStep,
    error,
    latitude,
    longitude,
    limit,
  ) {
    this.stations = stations;
    this.isError = isError;
    this.isFetching = isFetching;
    this.itineraryStep = itineraryStep;
    this.error = error;
    this.latitude = latitude;
    this.longitude = longitude;
    this.limit = limit;

    this.withStations = this.withStations.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);
    this.withError = this.withError.bind(this);
    this.withLatitude = this.withLatitude.bind(this);
    this.withLongitude = this.withLongitude.bind(this);
    this.withLimit = this.withLimit.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(
      [StationBuilder.create().build()],
      false,
      false,
      undefined,
      DEFAULT_LATITUDE,
      DEFAULT_LONGITUDE,
      DEFAULT_LIMIT,
    );
  }

  withStations(...stations) {
    const copy = this.copy();
    copy.stations = stations;

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

  withItineraryStep(itineraryStep) {
    const copy = this.copy();
    copy.itineraryStep = itineraryStep;

    return copy;
  }

  withError(error) {
    const copy = this.copy();
    copy.error = error;

    return copy;
  }

  withLatitude(latitude) {
    const copy = this.copy();
    copy.latitude = latitude;

    return copy;
  }

  withLongitude(longitude) {
    const copy = this.copy();
    copy.longitude = longitude;

    return copy;
  }

  withLimit(limit) {
    const copy = this.copy();
    copy.limit = limit;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.stations;

    return {
      data,
      error: this.isError,
      isFetching: this.isFetching,
      itineraryStep: this.itineraryStep,
      latitude: this.latitude,
      longitude: this.longitude,
      limit: this.limit,
    };
  }

  copy() {
    return new ItineraryStepBuilder(
      this.stations,
      this.isError,
      this.isFetching,
      this.itineraryStep,
      this.error,
      this.latitude,
      this.longitude,
      this.limit,
    );
  }
}

export default ItineraryStepBuilder;
