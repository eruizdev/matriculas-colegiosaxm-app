const TipoDocumento = require('../constants/tipo-documento');

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class AuthValidator {
  static validarLogin(data) {
    const errores = [];
    if (!data.correo) errores.push('El correo es obligatorio');
    if (!data.password) errores.push('La contraseña es obligatoria');
    return errores;
  }

  static validarRegistro(data) {
    const errores = [];
    if (!data.nombre) errores.push('El nombre es obligatorio');
    if (!data.apellido) errores.push('El apellido es obligatorio');
    if (!TipoDocumento[data.tipoDocumento]) errores.push('Selecciona un tipo de documento');
    if (!data.numeroDocumento) errores.push('El número de documento es obligatorio');
    if (!regexCorreo.test(data.correo || '')) errores.push('El correo no es válido');
    if (!data.password || data.password.length < 6) errores.push('La contraseña debe tener mínimo 6 caracteres');
    if (data.password !== data.confirmarPassword) errores.push('Las contraseñas no coinciden');
    return errores;
  }
}

module.exports = AuthValidator;
