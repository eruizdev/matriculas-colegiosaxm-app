class ResumenGradoDto {
  static desde(grado, cupos) {
    const total = cupos.reduce((suma, c) => suma + c.total, 0);
    const disponibles = cupos.reduce((suma, c) => suma + c.disponibles, 0);

    return {
      gradoId: grado.gradoId,
      grado: grado.grado,
      nivel: grado.nivel,
      total,
      disponibles,
      hayDisponibles: disponibles > 0,
      jornadas: cupos.map(c => ({ jornada: c.jornada, estado: c.estado }))
    };
  }
}

module.exports = ResumenGradoDto;
