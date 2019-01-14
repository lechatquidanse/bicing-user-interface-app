import {
  DEFAULT_LATITUDE, DEFAULT_LIMIT,
  DEFAULT_LONGITUDE,
} from 'domain/definitions/configurationMapDefinition';

class StateBuilder {
  constructor(error, data, latitude, longitude, limit) {
    this.error = error;
    this.data = data;
    this.latitude = latitude;
    this.longitude = longitude;
    this.limit = limit;

    this.withError = this.withError.bind(this);
    this.withData = this.withData.bind(this);
    this.withLatitude = this.withLatitude.bind(this);
    this.withLongitude = this.withLongitude.bind(this);
    this.withLimit = this.withLimit.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(false, undefined, DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_LIMIT);
  }

  withError(error) {
    const copy = this.copy();
    copy.error = error;

    return copy;
  }

  withData(data) {
    const copy = this.copy();
    copy.data = data;

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
    return {
      command: {
        configureMap: {
          error: this.error,
          data: this.data,
          latitude: this.latitude,
          longitude: this.longitude,
          limit: this.limit,
        },
      },
    };
  }

  copy() {
    return new StateBuilder(this.error, this.data, this.latitude, this.longitude, this.limit);
  }
}


export default StateBuilder;
