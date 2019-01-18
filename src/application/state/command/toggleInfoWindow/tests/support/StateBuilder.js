class StateBuilder {
  constructor(key, isReduced) {
    this.key = key;
    this.isReduced = isReduced;

    this.withKey = this.withKey.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(null, false);
  }

  withKey(key) {
    const copy = this.copy();
    copy.key = key;

    return copy;
  }

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const state = { key: this.key };

    return this.isReduced === true ? state : { command: { toggleInfoWindow: state } };
  }

  copy() {
    return new StateBuilder(this.key, this.isReduced);
  }
}

export default StateBuilder;
