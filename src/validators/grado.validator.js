class GradoValidator {
  static validar(data) {
    const errores = [];
    if (!data.nombre) errores.push('El nombre del grado es obligatorio');
    if (!data.nivel) errores.push('El nivel es obligatorio');
    return errores;
  }
}

module.exports = GradoValidator;
