const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\d{7,10}$/;

class AuthValidator {
  static validarLogin(data) {
    const errores = [];
    if (!data.correo) errores.push('El correo es obligatorio');
    if (!data.password) errores.push('La contraseña es obligatoria');
    return errores;
  }

  static validarRegistro(data) {
    const errores = [];
    const nombre = (data.nombre || '').trim();
    const telefono = (data.telefono || '').trim();

    if (nombre.length < 3) errores.push('El nombre debe tener mínimo 3 letras');
    if (!regexTelefono.test(telefono)) errores.push('El teléfono debe tener entre 7 y 10 números');
    if (!regexCorreo.test(data.correo || '')) errores.push('El correo no es válido');
    if (!data.password || data.password.length < 6) errores.push('La contraseña debe tener mínimo 6 caracteres');
    if (data.password !== data.confirmarPassword) errores.push('Las contraseñas no coinciden');
    return errores;
  }

  static validarCambioPassword(data) {
    const errores = [];
    if (!data.passwordActual) errores.push('Escribe tu contraseña actual');
    if (!data.passwordNueva || data.passwordNueva.length < 6) errores.push('La nueva contraseña debe tener mínimo 6 caracteres');
    if (data.passwordNueva !== data.confirmarPassword) errores.push('Las contraseñas nuevas no coinciden');
    return errores;
  }
}

module.exports = AuthValidator;
