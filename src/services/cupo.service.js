const cupoRepository = require('../repositories/cupo.repository');
const gradoRepository = require('../repositories/grado.repository');
const periodoAcademicoRepository = require('../repositories/periodo-academico.repository');
const CupoDisponibleDto = require('../dtos/cupo-disponible.dto');
const NotFoundError = require('../errors/not-found-error');

class CupoService {
  listar() {
    return cupoRepository.findAll().map(c => CupoDisponibleDto.desde(
      c,
      gradoRepository.findById(c.gradoId),
      periodoAcademicoRepository.findById(c.periodoId)
    ));
  }

  listarDisponibles(gradoId) {
    const periodo = periodoAcademicoRepository.findActivo();
    if (!periodo) return [];

    let cupos = cupoRepository.findByPeriodo(periodo.id);
    if (gradoId) cupos = cupos.filter(c => c.gradoId === Number(gradoId));

    return cupos.map(c => CupoDisponibleDto.desde(c, gradoRepository.findById(c.gradoId), periodo));
  }

  totalDisponibles() {
    return this.listarDisponibles().reduce((suma, c) => suma + c.disponibles, 0);
  }

  obtener(id) {
    const cupo = cupoRepository.findById(id);
    if (!cupo) throw new NotFoundError('Cupo no encontrado');
    return cupo;
  }

  crear(data) {
    return cupoRepository.create({
      gradoId: Number(data.gradoId),
      periodoId: Number(data.periodoId),
      jornada: data.jornada,
      total: Number(data.total),
      ocupados: Number(data.ocupados) || 0
    });
  }

  actualizar(id, data) {
    this.obtener(id);
    return cupoRepository.update(id, {
      total: Number(data.total),
      ocupados: Number(data.ocupados)
    });
  }

  eliminar(id) {
    this.obtener(id);
    return cupoRepository.delete(id);
  }
}

module.exports = new CupoService();
