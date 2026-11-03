const AppError = require('./app-error');

class BadRequestError extends AppError {
  constructor(mensaje = 'La solicitud no es válida') {
    super(mensaje, 400);
  }
}

module.exports = BadRequestError;
