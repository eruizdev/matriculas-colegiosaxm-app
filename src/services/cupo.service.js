const cupoRepository = require('../repositories/cupo.repository');
const gradoRepository = require('../repositories/grado.repository');
const periodoAcademicoRepository = require('../repositories/periodo-academico.repository');
const CupoDisponibleDto = require('../dtos/cupo-disponible.dto');
const { BadRequestError, ConflictError, NotFoundError } = require('../errors');

class CupoService {
  convertir(cupo, periodo) {
    return CupoDisponibleDto.desde(
      cupo,
      gradoRepository.findById(cupo.gradoId),
      periodo || periodoAcademicoRepository.findById(cupo.periodoId)
    );
  }

  ordenarPorGrado(cupos) {
    const orden = cupo => {
      const grado = gradoRepository.findById(cupo.gradoId);
      return grado ? grado.orden : 0;
    };
    return [...cupos].sort((a, b) => orden(a) - orden(b));
  }

  listar(filtros = {}) {
    const cupos = cupoRepository.findByFiltros(filtros);
    return this.ordenarPorGrado(cupos).map(c => this.convertir(c));
  }

  listarDisponibles(filtros = {}) {
    const periodo = periodoAcademicoRepository.findActivo();
    if (!periodo) return [];

    const cupos = cupoRepository.findByFiltros({ ...filtros, periodoId: periodo.id }).filter(c => {
      const grado = gradoRepository.findById(c.gradoId);
      return grado && grado.activo;
    });

    return this.ordenarPorGrado(cupos).map(c => this.convertir(c, periodo));
  }

  resumenPorGrado() {
    const resumen = [];

    this.listarDisponibles().forEach(cupo => {
      let item = resumen.find(r => r.gradoId === cupo.gradoId);
      if (!item) {
        item = { gradoId: cupo.gradoId, grado: cupo.grado, nivel: cupo.nivel, total: 0, disponibles: 0, jornadas: [] };
        resumen.push(item);
      }
      item.total += cupo.total;
      item.disponibles += cupo.disponibles;
      item.jornadas.push({ jornada: cupo.jornada, estado: cupo.estado });
    });

    return resumen.map(r => ({ ...r, hayDisponibles: r.disponibles > 0 }));
  }

  totales() {
    return this.listarDisponibles().reduce((suma, c) => ({
      total: suma.total + c.total,
      ocupados: suma.ocupados + c.ocupados,
      disponibles: suma.disponibles + c.disponibles
    }), { total: 0, ocupados: 0, disponibles: 0 });
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
