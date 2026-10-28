const requisitoRepository = require('../repositories/requisito.repository');
const NotFoundError = require('../errors/not-found-error');

class RequisitoService {
  listar() {
    return requisitoRepository.findAll();
  }

  obtener(id) {
    const requisito = requisitoRepository.findById(id);
    if (!requisito) throw new NotFoundError('Requisito no encontrado');
    return requisito;
  }

  crear(data) {
    return requisitoRepository.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      orden: Number(data.orden) || 0
    });
  }

  actualizar(id, data) {
    this.obtener(id);
    return requisitoRepository.update(id, data);
  }

  eliminar(id) {
    this.obtener(id);
    return requisitoRepository.delete(id);
  }
}

module.exports = new RequisitoService();
