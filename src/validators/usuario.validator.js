class UsuarioValidator {
  static validarPerfil(data) {
    const errores = [];
    if (!data.nombre) errores.push('El nombre es obligatorio');
    if (!data.apellido) errores.push('El apellido es obligatorio');
    if (data.telefono && !/^\d{7,10}$/.test(data.telefono)) errores.push('El teléfono debe tener entre 7 y 10 números');
    return errores;
  }
}

module.exports = UsuarioValidator;
