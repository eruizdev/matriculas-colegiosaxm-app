const gradoRepository = require('../repositories/grado.repository');
const NotFoundError = require('../errors/not-found-error');

class GradoService {
  listar() {
    return gradoRepository.findAll();
  }

  listarActivos() {
    return gradoRepository.findAll().filter(g => g.activo);
  }

  obtener(id) {
    const grado = gradoRepository.findById(id);
    if (!grado) throw new NotFoundError('Grado no encontrado');
    return grado;
  }

  crear(data) {
    return gradoRepository.create({
      nombre: data.nombre,
      nivel: data.nivel,
      orden: Number(data.orden) || 0
    });
  }

  actualizar(id, data) {
    this.obtener(id);
    return gradoRepository.update(id, data);
  }

  eliminar(id) {
    this.obtener(id);
    return gradoRepository.delete(id);
  }
}

module.exports = new GradoService();
