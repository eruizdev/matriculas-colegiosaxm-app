class RequisitoValidator {
  static validar(data) {
    const errores = [];
    if (!data.titulo) errores.push('El título es obligatorio');
    if (!data.descripcion) errores.push('La descripción es obligatoria');
    return errores;
  }
}

module.exports = RequisitoValidator;
