class AppError extends Error {
  constructor(mensaje, statusCode = 500, detalles = []) {
    super(mensaje);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.detalles = detalles;
  }

  esDelCliente() {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  mensajes() {
    return this.detalles.length > 0 ? this.detalles : [this.message];
  }

  toJSON() {
    return {
      error: this.name,
      status: this.statusCode,
      mensaje: this.message,
      detalles: this.detalles
    };
  }

  static esDelCliente(error) {
    return error instanceof AppError && error.esDelCliente();
  }
}

module.exports = AppError;
