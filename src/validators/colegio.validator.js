const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ColegioValidator {
  static validar(data) {
    const errores = [];
    const nombre = (data.nombre || '').trim();
    const telefono = (data.telefono || '').trim();
    const correo = (data.correo || '').trim();

    if (nombre.length < 3) errores.push('El nombre del colegio debe tener mínimo 3 letras');
    if (telefono && !/^\d{7,10}$/.test(telefono)) errores.push('El teléfono debe tener entre 7 y 10 números');
    if (correo && !regexCorreo.test(correo)) errores.push('El correo no es válido');
    return errores;
  }
}

module.exports = ColegioValidator;
