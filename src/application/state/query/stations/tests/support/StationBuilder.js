import { v4 as uuid } from 'uuid';
import { TYPE_BIKE } from 'domain/definitions/stationDefinition';

class StationBuilder {
  constructor(stationId, name, latitude, longitude, type, zipCode) {
    this.stationId = stationId;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.type = type;
    this.zipCode = zipCode;

    this.withStationId = this.withStationId.bind(this);
    this.withName = this.withName.bind(this);
    this.withLatitude = this.withLatitude.bind(this);
    this.withLongitude = this.withLongitude.bind(this);
    this.withType = this.withType.bind(this);
    this.withZipCode = this.withZipCode.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(
      uuid(),
      'GRAN VIA CORTS CATALANES',
      41.234,
      2.12,
      TYPE_BIKE,
      undefined,
    );
  }

  withStationId(stationId) {
    const copy = this.copy();
    copy.stationId = stationId;

    return copy;
  }

  withName(name) {
    const copy = this.copy();
    copy.name = name;

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

  withType(type) {
    const copy = this.copy();
    copy.type = type;

    return copy;
  }

  withZipCode(zipCode) {
    const copy = this.copy();
    copy.zipCode = zipCode;

    return copy;
  }

  build() {
    return {
      id: this.stationId,
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.type,
      zipCode: this.zipCode,
    };
  }

  copy() {
    return new StationBuilder(
      this.stationId,
      this.name,
      this.latitude,
      this.longitude,
      this.type,
      this.zipCode,
    );
  }
}

export default StationBuilder;
