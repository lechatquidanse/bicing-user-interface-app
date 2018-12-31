class InfrastructureError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InfrastructureError);
  }

  toString() {
    return this.message;
  }
}

export default InfrastructureError;
