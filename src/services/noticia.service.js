const noticiaRepository = require('../repositories/noticia.repository');
const NoticiaDto = require('../dtos/noticia.dto');
const NotFoundError = require('../errors/not-found-error');

class NoticiaService {
  listar() {
    return noticiaRepository.findAll().map(n => NoticiaDto.desde(n));
  }

  listarPublicadas(limite) {
    const noticias = noticiaRepository.findPublicadas().map(n => NoticiaDto.desde(n));
    return limite ? noticias.slice(0, limite) : noticias;
  }

  obtenerPublicada(id) {
    const noticia = noticiaRepository.findById(id);
    if (!noticia || !noticia.publicada) throw new NotFoundError('Noticia no encontrada');
    return NoticiaDto.desde(noticia);
  }

  crear(data) {
    return noticiaRepository.create({
      titulo: data.titulo,
      contenido: data.contenido,
      publicada: data.publicada === 'on'
    });
  }

  cambiarEstado(id) {
    const noticia = noticiaRepository.findById(id);
    if (!noticia) throw new NotFoundError('Noticia no encontrada');
    noticiaRepository.update(id, { publicada: !noticia.publicada });
  }

  eliminar(id) {
    const eliminada = noticiaRepository.delete(id);
    if (!eliminada) throw new NotFoundError('Noticia no encontrada');
  }
}

module.exports = new NoticiaService();
