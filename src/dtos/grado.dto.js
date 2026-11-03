class GradoDto {
  static desde(grado) {
    return {
      id: grado.id,
      nombre: grado.nombre,
      nivel: grado.nivel,
      nombreCompleto: grado.nombreCompleto(),
      orden: grado.orden,
      activo: grado.activo,
      estado: grado.activo ? 'Activo' : 'Inactivo'
    };
  }
}

module.exports = GradoDto;
