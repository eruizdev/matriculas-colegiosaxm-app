const cupoRepository = require('../repositories/cupo.repository');
const gradoRepository = require('../repositories/grado.repository');
const periodoAcademicoRepository = require('../repositories/periodo-academico.repository');
const CupoDto = require('../dtos/cupo.dto');
const CupoDisponibleDto = require('../dtos/cupo-disponible.dto');
const ResumenGradoDto = require('../dtos/resumen-grado.dto');
const TotalesCupoDto = require('../dtos/totales-cupo.dto');
const { BadRequestError, ConflictError, NotFoundError } = require('../errors');

class CupoService {
  ordenarPorGrado(cupos) {
    const orden = cupo => {
      const grado = gradoRepository.findById(cupo.gradoId);
      return grado ? grado.orden : 0;
    };
    return [...cupos].sort((a, b) => orden(a) - orden(b));
  }

  cuposDelPeriodoActivo(filtros = {}) {
    const periodo = periodoAcademicoRepository.findActivo();
    if (!periodo) return [];

    const cupos = cupoRepository.findByFiltros({ ...filtros, periodoId: periodo.id }).filter(c => {
      const grado = gradoRepository.findById(c.gradoId);
      return grado && grado.activo;
    });

    return this.ordenarPorGrado(cupos);
  }

  listar(filtros = {}) {
    const cupos = cupoRepository.findByFiltros(filtros);
    return this.ordenarPorGrado(cupos).map(c => CupoDto.desde(
      c,
      gradoRepository.findById(c.gradoId),
      periodoAcademicoRepository.findById(c.periodoId)
    ));
  }

  listarDisponibles(filtros = {}) {
    return this.cuposDelPeriodoActivo(filtros).map(c => CupoDisponibleDto.desde(c, gradoRepository.findById(c.gradoId)));
  }

  resumenPorGrado() {
    const grupos = [];

    this.listarDisponibles().forEach(cupo => {
      let grupo = grupos.find(g => g.gradoId === cupo.gradoId);
      if (!grupo) {
        grupo = { gradoId: cupo.gradoId, grado: cupo.grado, nivel: cupo.nivel, cupos: [] };
        grupos.push(grupo);
      }
      grupo.cupos.push(cupo);
    });

    return grupos.map(g => ResumenGradoDto.desde(g, g.cupos));
  }

  totales() {
    return TotalesCupoDto.desde(this.cuposDelPeriodoActivo());
  }

  totalDisponibles() {
    return this.totales().disponibles;
  }

  obtener(id) {
    const cupo = cupoRepository.findById(id);
    if (!cupo) throw new NotFoundError('Cupo no encontrado');
    return cupo;
  }

  crear(data) {
    if (!gradoRepository.findById(data.gradoId)) throw new BadRequestError('El grado seleccionado no existe');
    if (!periodoAcademicoRepository.findById(data.periodoId)) throw new BadRequestError('El periodo seleccionado no existe');
    if (cupoRepository.existe(data.gradoId, data.periodoId, data.jornada)) {
      throw new ConflictError('Ya existen cupos para ese grado, periodo y jornada');
    }

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
      ocupados: Number(data.ocupados) || 0
    });
  }

  ocupar(id, cantidad = 1) {
    const cupo = this.obtener(id);
    if (!cupo.ocupar(Number(cantidad))) throw new BadRequestError('No hay suficientes cupos disponibles');
    return cupo;
  }

  liberar(id, cantidad = 1) {
    const cupo = this.obtener(id);
    if (!cupo.liberar(Number(cantidad))) throw new BadRequestError('No se pueden liberar más cupos de los ocupados');
    return cupo;
  }

  contarPorGrado(gradoId) {
    return cupoRepository.findByGrado(gradoId).length;
  }

  contarPorPeriodo(periodoId) {
    return cupoRepository.findByPeriodo(periodoId).length;
  }

  eliminar(id) {
    this.obtener(id);
    return cupoRepository.delete(id);
  }
}

module.exports = new CupoService();
