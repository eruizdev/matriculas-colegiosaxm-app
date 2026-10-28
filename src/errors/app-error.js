class AppError extends Error {
  constructor(mensaje, statusCode = 500) {
    super(mensaje);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
