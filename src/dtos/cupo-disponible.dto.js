const FechaUtil = require('../utils/fecha.util');

class CupoDisponibleDto {
  static desde(cupo, grado) {
    return {
      id: cupo.id,
      gradoId: cupo.gradoId,
      grado: grado ? grado.nombre : 'Sin grado',
      nivel: grado ? grado.nivel : '',
      jornada: cupo.jornada,
      total: cupo.total,
      disponibles: cupo.disponibles(),
      hayDisponibles: cupo.hayDisponibles(),
      porcentaje: cupo.porcentajeOcupacion(),
      estado: cupo.estado(),
      actualizado: FechaUtil.formatear(cupo.fechaActualizacion)
    };
  }
}

module.exports = CupoDisponibleDto;
