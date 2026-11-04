const requisitoRepository = require('../repositories/requisito.repository');
const RequisitoDto = require('../dtos/requisito.dto');
const NotFoundError = require('../errors/not-found-error');

class RequisitoService {
  listar() {
    return requisitoRepository.findAll().map(r => RequisitoDto.desde(r));
  }

  listarObligatorios() {
    return requisitoRepository.findObligatorios().map(r => RequisitoDto.desde(r));
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
      orden: Number(data.orden) || 0,
      obligatorio: data.obligatorio === 'on'
    });
  }

  actualizar(id, data) {
    this.obtener(id);
    return requisitoRepository.update(id, {
      titulo: data.titulo.trim(),
      descripcion: data.descripcion.trim(),
      orden: Number(data.orden) || 0,
      obligatorio: data.obligatorio === 'on'
    });
  }

  eliminar(id) {
    this.obtener(id);
    return requisitoRepository.delete(id);
  }
}

module.exports = new RequisitoService();
