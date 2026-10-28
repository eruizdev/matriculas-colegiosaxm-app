class NoticiaValidator {
  static validar(data) {
    const errores = [];
    if (!data.titulo) errores.push('El título es obligatorio');
    if (!data.contenido) errores.push('El contenido es obligatorio');
    return errores;
  }
}

module.exports = NoticiaValidator;
