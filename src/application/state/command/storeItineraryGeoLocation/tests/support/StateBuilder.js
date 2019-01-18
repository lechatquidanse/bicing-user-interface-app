import ItineraryStepBuilder
  from 'application/state/command/storeItineraryGeoLocation/tests/support/ItineraryStepBuilder';

class StateBuilder {
  constructor(itinerarySteps, isReduced) {
    this.itinerarySteps = itinerarySteps;
    this.isReduced = isReduced;

    this.withItinerarySteps = this.withItinerarySteps.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static async create() {
    const itineraryStepBuilder = await ItineraryStepBuilder.create();

    return new this(
      [
        itineraryStepBuilder.withItineraryStep(0).build(),
        itineraryStepBuilder.withItineraryStep(1).build(),
      ],
      false,
    );
  }

  withItinerarySteps(...itinerarySteps) {
    const copy = this.copy();
    copy.itinerarySteps = itinerarySteps;

    return copy;
  }

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const state = { itinerarySteps: this.itinerarySteps };

    return this.isReduced === true ? state : { command: { storeItineraryGeoLocation: state } };
  }

  copy() {
    return new StateBuilder(this.itinerarySteps, this.isReduced);
  }
}

export default StateBuilder;
