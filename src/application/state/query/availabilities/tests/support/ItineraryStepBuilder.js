import AvailabilityBuilder
  from 'application/state/query/availabilities/tests/support/AvailabilityBuilder';
import { DEFAULT_INTERVAL_AVAILABILITIES } from 'domain/definitions/byIntervalInPeriodDefinition';
import Clock from 'infrastructure/system/Clock';

class ItineraryStepBuilder {
  constructor(
    availabilities,
    isError,
    isFetching,
    error,
    interval,
    itineraryAt,
    itineraryStep,
    periodStartAt,
    periodEndAt,
    stationIds,
  ) {
    this.availabilities = availabilities;
    this.isError = isError;
    this.isFetching = isFetching;
    this.error = error;
    this.interval = interval;
    this.itineraryAt = itineraryAt;
    this.itineraryStep = itineraryStep;
    this.periodStartAt = periodStartAt;
    this.periodEndAt = periodEndAt;
    this.stationIds = stationIds;

    this.withAvailabilities = this.withAvailabilities.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withError = this.withError.bind(this);
    this.withInterval = this.withInterval.bind(this);
    this.withItineraryAt = this.withItineraryAt.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);
    this.withPeriodStartAt = this.withPeriodStartAt.bind(this);
    this.withPeriodEndAt = this.withPeriodEndAt.bind(this);
    this.withStationIds = this.withStationIds.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(
      [AvailabilityBuilder.create().build()],
      false,
      false,
      undefined,
      DEFAULT_INTERVAL_AVAILABILITIES,
      Clock.nowDateTimeFormatted(),
      0,
      Clock.nowDateTimeFormatted(),
      Clock.nowDateTimeFormatted(),
      [],
    );
  }

  withAvailabilities(...availabilities) {
    const copy = this.copy();
    copy.availabilities = availabilities;

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

  withInterval(interval) {
    const copy = this.copy();
    copy.interval = interval;

    return copy;
  }

  withItineraryAt(itineraryAt) {
    const copy = this.copy();
    copy.itineraryAt = itineraryAt;

    return copy;
  }

  withItineraryStep(itineraryStep) {
    const copy = this.copy();
    copy.itineraryStep = itineraryStep;

    return copy;
  }

  withPeriodStartAt(periodStartAt) {
    const copy = this.copy();
    copy.periodStartAt = periodStartAt;

    return copy;
  }

  withPeriodEndAt(periodEndAt) {
    const copy = this.copy();
    copy.periodEndAt = periodEndAt;

    return copy;
  }

  withStationIds(stationIds) {
    const copy = this.copy();
    copy.stationIds = stationIds;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.availabilities;

    return {
      data,
      error: this.isError,
      isFetching: this.isFetching,
      interval: this.interval,
      itineraryAt: this.itineraryAt,
      itineraryStep: this.itineraryStep,
      periodStartAt: this.periodStartAt,
      periodEndAt: this.periodEndAt,
      stationIds: this.stationIds,
    };
  }

  copy() {
    return new ItineraryStepBuilder(
      this.availabilities,
      this.isError,
      this.isFetching,
      this.error,
      this.interval,
      this.itineraryAt,
      this.itineraryStep,
      this.periodStartAt,
      this.periodEndAt,
      this.stationIds,
    );
  }
}

export default ItineraryStepBuilder;
