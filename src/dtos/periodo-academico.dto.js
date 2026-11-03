const FechaUtil = require('../utils/fecha.util');

class PeriodoAcademicoDto {
  static desde(periodo) {
    return {
      id: periodo.id,
      nombre: periodo.nombre,
      anio: periodo.anio,
      fechaInicio: periodo.fechaInicio ? FechaUtil.formatear(periodo.fechaInicio) : 'Sin fecha',
      fechaFin: periodo.fechaFin ? FechaUtil.formatear(periodo.fechaFin) : 'Sin fecha',
      duracionDias: periodo.duracionDias(),
      vigente: periodo.estaVigente(),
      activo: periodo.activo,
      estado: periodo.activo ? 'Activo' : 'Inactivo'
    };
  }
}

module.exports = PeriodoAcademicoDto;
