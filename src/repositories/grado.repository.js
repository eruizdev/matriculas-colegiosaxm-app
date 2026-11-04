const BaseRepository = require('./base.repository');
const Grado = require('../models/grado.model');

class GradoRepository extends BaseRepository {
  constructor() {
    super(Grado);
  }

  ordenar(grados) {
    return grados.sort((a, b) => a.orden - b.orden);
  }

  findActivos() {
    return this.findBy(g => g.activo);
  }

  existeNombre(nombre, excluirId) {
    const buscado = nombre.trim().toLowerCase();
    return this.registros.some(g => g.nombre.toLowerCase() === buscado && g.id !== Number(excluirId));
  }
}

module.exports = new GradoRepository();
