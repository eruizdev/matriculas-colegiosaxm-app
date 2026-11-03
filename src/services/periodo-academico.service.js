const periodoAcademicoRepository = require('../repositories/periodo-academico.repository');
const cupoRepository = require('../repositories/cupo.repository');
const PeriodoAcademicoDto = require('../dtos/periodo-academico.dto');
const { ConflictError, NotFoundError } = require('../errors');

class PeriodoAcademicoService {
  listar() {
    return periodoAcademicoRepository.findAll().map(p => PeriodoAcademicoDto.desde(p));
  }

  obtener(id) {
    const periodo = periodoAcademicoRepository.findById(id);
    if (!periodo) throw new NotFoundError('Periodo no encontrado');
    return periodo;
  }

  obtenerActivo() {
    return periodoAcademicoRepository.findActivo() || null;
  }

  crear(data) {
    return periodoAcademicoRepository.create({
      nombre: data.nombre,
      anio: Number(data.anio),
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin
    });
  }

  activar(id) {
    this.obtener(id);
    periodoAcademicoRepository.findAll().forEach(p => {
      p.activo = p.id === Number(id);
    });
  }

  eliminar(id) {
    this.obtener(id);
    if (cupoRepository.findByPeriodo(id).length > 0) {
      throw new ConflictError('No se puede eliminar un periodo que tiene cupos, elimina primero sus cupos');
    }
    return periodoAcademicoRepository.delete(id);
  }
}

module.exports = new PeriodoAcademicoService();
