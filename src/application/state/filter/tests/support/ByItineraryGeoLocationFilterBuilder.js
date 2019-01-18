import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';

class ByItineraryGeoLocationFilterBuilder {
  constructor(latitude, longitude, limit) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.limit = limit;

    this.withLatitude = this.withLatitude.bind(this);
    this.withLongitude = this.withLongitude.bind(this);
    this.withLimit = this.withLimit.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(41.123, 2.12, 1000);
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

  async build() {
    return ByItineraryGeoLocationFilter.fromRawValues(this.latitude, this.longitude, this.limit);
  }

  copy() {
    return new ByItineraryGeoLocationFilterBuilder(this.latitude, this.longitude, this.limit);
  }
}

export default ByItineraryGeoLocationFilterBuilder;
