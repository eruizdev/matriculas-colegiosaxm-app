class CupoDisponibleDto {
  static desde(cupo, grado, periodo) {
    return {
      id: cupo.id,
      gradoId: cupo.gradoId,
      grado: grado ? grado.nombre : 'Sin grado',
      periodo: periodo ? periodo.nombre : '',
      jornada: cupo.jornada,
      total: cupo.total,
      ocupados: cupo.ocupados,
      disponibles: cupo.disponibles(),
      hayDisponibles: cupo.hayDisponibles()
    };
  }
}

module.exports = CupoDisponibleDto;
