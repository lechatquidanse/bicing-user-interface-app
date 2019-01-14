import { createStore } from 'redux';
import { rootReducer } from 'application/state/store';

class StoreBuilder {
  constructor(initialState) {
    this.initialState = initialState;

    this.withInitialState = this.withInitialState.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this({});
  }

  withInitialState(initialState) {
    this.initialState = initialState;

    return this.copy();
  }

  build() {
    return createStore(rootReducer, this.initialState);
  }

  copy() {
    return new StoreBuilder(this.initialState);
  }
}

export default StoreBuilder;
