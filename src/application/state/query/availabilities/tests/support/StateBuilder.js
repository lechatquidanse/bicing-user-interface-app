import ItineraryStepBuilder
  from 'application/state/query/availabilities/tests/support/ItineraryStepBuilder';

class StateBuilder {
  constructor(itinerarySteps) {
    this.itinerarySteps = itinerarySteps;

    this.withItinerarySteps = this.withItinerarySteps.bind(this);

    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this([
      ItineraryStepBuilder.create().withItineraryStep(0).build(),
      ItineraryStepBuilder.create().withItineraryStep(1).build(),
    ]);
  }

  withItinerarySteps(...itinerarySteps) {
    const copy = this.copy();
    copy.itinerarySteps = itinerarySteps;

    return copy;
  }

  build() {
    return {
      query: {
        availabilities: {
          itinerarySteps: this.itinerarySteps,
        },
      },
    };
  }

  copy() {
    return new StateBuilder(this.itinerarySteps);
  }
}

export default StateBuilder;
