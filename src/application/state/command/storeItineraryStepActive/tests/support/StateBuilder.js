class StateBuilder {
  constructor(itineraryStep, isReduced) {
    this.itineraryStep = itineraryStep;
    this.isReduced = isReduced;

    this.withItineraryStep = this.withItineraryStep.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(0, false);
  }

  withItineraryStep(itineraryStep) {
    const copy = this.copy();
    copy.itineraryStep = itineraryStep;

    return copy;
  }

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const state = { itineraryStep: this.itineraryStep };

    return this.isReduced === true ? state : { command: { storeItineraryStepActive: state } };
  }

  copy() {
    return new StateBuilder(this.itineraryStep, this.isReduced);
  }
}

export default StateBuilder;
