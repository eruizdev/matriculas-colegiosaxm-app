const periodoAcademicoRepository = require('../repositories/periodo-academico.repository');
const NotFoundError = require('../errors/not-found-error');

class PeriodoAcademicoService {
  listar() {
    return periodoAcademicoRepository.findAll();
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
    return periodoAcademicoRepository.delete(id);
  }
}

module.exports = new PeriodoAcademicoService();
