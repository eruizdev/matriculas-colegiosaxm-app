const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ContactoValidator {
  static validar(data) {
    const errores = [];
    if (!data.nombre) errores.push('El nombre es obligatorio');
    if (!regexCorreo.test(data.correo || '')) errores.push('El correo no es válido');
    if (!data.asunto) errores.push('El asunto es obligatorio');
    if (!data.mensaje) errores.push('El mensaje es obligatorio');
    return errores;
  }
}

module.exports = ContactoValidator;
