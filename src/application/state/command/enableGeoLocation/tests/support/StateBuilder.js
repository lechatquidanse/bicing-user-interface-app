class StateBuilder {
  constructor(enabled, itineraryStep) {
    this.enabled = enabled;
    this.itineraryStep = itineraryStep;

    this.withEnabled = this.withEnabled.bind(this);
    this.withItineraryStep = this.withItineraryStep.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(false, 0);
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

  build() {
    return {
      command: {
        enableGeoLocation: {
          enabled: this.enabled,
          itineraryStep: this.itineraryStep,
        },
      },
    };
  }

  copy() {
    return new StateBuilder(this.enabled, this.itineraryStep);
  }
}

export default StateBuilder;
