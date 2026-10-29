class UsuarioValidator {
  static validarPerfil(data) {
    const errores = [];
    const nombre = (data.nombre || '').trim();
    const telefono = (data.telefono || '').trim();

    if (nombre.length < 3) errores.push('El nombre debe tener mínimo 3 letras');
    if (!/^\d{7,10}$/.test(telefono)) errores.push('El teléfono debe tener entre 7 y 10 números');
    return errores;
  }
}

module.exports = UsuarioValidator;
