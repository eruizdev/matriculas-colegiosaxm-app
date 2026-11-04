class ResumenGradoDto {
  static desde(resumen) {
    return {
      gradoId: resumen.gradoId,
      grado: resumen.grado,
      nivel: resumen.nivel,
      total: resumen.total,
      disponibles: resumen.disponibles,
      hayDisponibles: resumen.hayDisponibles(),
      jornadas: resumen.jornadas
    };
  }
}

module.exports = ResumenGradoDto;
