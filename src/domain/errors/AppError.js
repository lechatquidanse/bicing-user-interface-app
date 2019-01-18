class AppError extends Error {
  constructor(message, publicMessage) {
    super(message);

    this.publicMessage = publicMessage;

    this.toDisplay = this.toDisplay.bind(this);
  }

  toDisplay() {
    return this.publicMessage;
  }
}

export default AppError;
