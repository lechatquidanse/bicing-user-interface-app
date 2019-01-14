class StateBuilder {
  constructor(key) {
    this.key = key;

    this.withKey = this.withKey.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this(null);
  }

  withKey(key) {
    const copy = this.copy();
    copy.key = key;

    return copy;
  }

  build() {
    return {
      command: {
        toggleInfoWindow: {
          key: this.key,
        },
      },
    };
  }

  copy() {
    return new StateBuilder(this.key);
  }
}

export default StateBuilder;
