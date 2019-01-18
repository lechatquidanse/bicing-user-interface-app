class StateBuilder {
  constructor(enabled, itineraryStep, isReduced) {
    this.enabled = enabled;
    this.itineraryStep = itineraryStep;
    this.isReduced = isReduced;

    this.withEnabled = this.withEnabled.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(false, 0, false);
  }

  withEnabled(enabled) {
    const copy = this.copy();
    copy.enabled = enabled;

    return copy;
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
    const state = { enabled: this.enabled, itineraryStep: this.itineraryStep };

    return this.isReduced === true ? state : { command: { enableGeoLocation: state } };
  }

  copy() {
    return new StateBuilder(this.enabled, this.itineraryStep, this.isReduced);
  }
}

export default StateBuilder;
