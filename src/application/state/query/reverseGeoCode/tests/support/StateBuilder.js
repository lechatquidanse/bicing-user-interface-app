class StateBuilder {
  constructor(address, isError, error, isFetching, isReduced) {
    this.address = address;
    this.isError = isError;
    this.error = error;
    this.isFetching = isFetching;
    this.isReduced = isReduced;

    this.withAddress = this.withAddress.bind(this);
    this.withIsError = this.withIsError.bind(this);
    this.withError = this.withError.bind(this);
    this.withIsFetching = this.withIsFetching.bind(this);
    this.withIsReduced = this.withIsReduced.bind(this);
    this.build = this.build.bind(this);
    this.copy = this.copy.bind(this);
  }

  static create() {
    return new this('ramiro de maeztu', false, undefined, false, false);
  }

  withAddress(address) {
    const copy = this.copy();
    copy.address = address;

    return copy;
  }

  withError(error) {
    const copy = this.copy();
    copy.error = error;

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

  withIsReduced(isReduced) {
    const copy = this.copy();
    copy.isReduced = isReduced;

    return copy;
  }

  build() {
    const data = this.isError === true ? this.error : this.address;
    const state = { data, error: this.isError, isFetching: this.isFetching };

    return this.isReduced === true ? state : { query: { reverseGeoCode: state } };
  }

  copy() {
    return new StateBuilder(
      this.address,
      this.isError,
      this.error,
      this.isFetching,
      this.isReduced,
    );
  }
}

export default StateBuilder;
