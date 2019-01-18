import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import moment from 'moment';

class ByItineraryAtFilterBuilder {
  constructor(itineraryAt, periodStartAt, periodEnAt, interval) {
    this.itineraryAt = itineraryAt;
    this.periodStartAt = periodStartAt;
    this.periodEnAt = periodEnAt;
    this.interval = interval;

    this.withItineraryAt = this.withItineraryAt.bind(this);
    this.withPeriodStartAt = this.withPeriodStartAt.bind(this);
    this.withPeriodEndAt = this.withPeriodEndAt.bind(this);
    this.withInterval = this.withInterval.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    const now = moment();
    return new this(now.clone(), now.clone(), now.clone(), '5T');
  }

  withItineraryAt(itineraryAt) {
    const copy = this.copy();
    copy.itineraryAt = itineraryAt;

    return copy;
  }

  withPeriodStartAt(periodStartAt) {
    const copy = this.copy();
    copy.periodStartAt = periodStartAt;

    return copy;
  }

  withPeriodEndAt(periodEnAt) {
    const copy = this.copy();
    copy.periodEnAt = periodEnAt;

    return copy;
  }

  withInterval(interval) {
    const copy = this.copy();
    copy.interval = interval;

    return copy;
  }

  async build() {
    return ByItineraryAtFilter.fromRawValues(
      this.itineraryAt,
      this.periodStartAt,
      this.periodEnAt,
      this.interval,
    );
  }

  copy() {
    return new ByItineraryAtFilterBuilder(
      this.itineraryAt,
      this.periodStartAt,
      this.periodEnAt,
      this.interval,
    );
  }
}

export default ByItineraryAtFilterBuilder;
