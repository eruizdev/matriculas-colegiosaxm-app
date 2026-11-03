const FechaUtil = require('../utils/fecha.util');

class CupoDto {
  static desde(cupo, grado, periodo) {
    return {
      id: cupo.id,
      gradoId: cupo.gradoId,
      periodoId: cupo.periodoId,
      grado: grado ? grado.nombre : 'Sin grado',
      nivel: grado ? grado.nivel : '',
      periodo: periodo ? periodo.nombre : '',
      jornada: cupo.jornada,
      total: cupo.total,
      ocupados: cupo.ocupados,
      disponibles: cupo.disponibles(),
      hayDisponibles: cupo.hayDisponibles(),
      puedeLiberar: cupo.ocupados > 0,
      porcentaje: cupo.porcentajeOcupacion(),
      estado: cupo.estado(),
      actualizado: FechaUtil.formatear(cupo.fechaActualizacion)
    };
  }
}

module.exports = CupoDto;
