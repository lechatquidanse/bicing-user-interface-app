import { STATUS_OPENED } from 'domain/definitions/availabilityDefinition';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

class AvailabilityBuilder {
  constructor(stationId, status, availableBikeNumber, availableSlotNumber, statedAt) {
    this.stationId = stationId;
    this.status = status;
    this.availableBikeNumber = availableBikeNumber;
    this.availableSlotNumber = availableSlotNumber;
    this.statedAt = statedAt;

    this.withStationId = this.withStationId.bind(this);
    this.withStatus = this.withStatus.bind(this);
    this.withAvailableBikeNumber = this.withAvailableBikeNumber.bind(this);
    this.withAvailableSlotNumber = this.withAvailableSlotNumber.bind(this);
    this.withStatedAt = this.withStatedAt.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(uuid(), STATUS_OPENED, 18, 12, moment());
  }

  withStationId(stationId) {
    const copy = this.copy();
    copy.stationId = stationId;

    return copy;
  }

  withStatus(status) {
    const copy = this.copy();
    copy.status = status;

    return copy;
  }

  withAvailableBikeNumber(availableBikeNumber) {
    const copy = this.copy();
    copy.availableBikeNumber = availableBikeNumber;

    return copy;
  }

  withAvailableSlotNumber(availableSlotNumber) {
    const copy = this.copy();
    copy.availableSlotNumber = availableSlotNumber;

    return copy;
  }

  withStatedAt(statedAt) {
    const copy = this.copy();
    copy.statedAt = statedAt;

    return copy;
  }

  build() {
    return {
      id: this.stationId,
      status: this.status,
      availableBikeNumber: this.availableBikeNumber,
      availableSlotNumber: this.availableSlotNumber,
      statedAt: this.statedAt.toString(),
    };
  }

  copy() {
    return new AvailabilityBuilder(
      this.stationId,
      this.status,
      this.availableBikeNumber,
      this.availableSlotNumber,
      this.statedAt,
    );
  }
}

export default AvailabilityBuilder;
