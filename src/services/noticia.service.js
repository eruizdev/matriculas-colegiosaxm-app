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

  obtener(id) {
    const noticia = noticiaRepository.findById(id);
    if (!noticia) throw new NotFoundError('Noticia no encontrada');
    return noticia;
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

  actualizar(id, data) {
    this.obtener(id);
    return noticiaRepository.update(id, {
      titulo: data.titulo.trim(),
      contenido: data.contenido.trim(),
      publicada: data.publicada === 'on'
    });
  }

  cambiarEstado(id) {
    const noticia = this.obtener(id);
    noticia.cambiarEstado();
    return noticia;
  }

  eliminar(id) {
    this.obtener(id);
    return noticiaRepository.delete(id);
  }
}

module.exports = new NoticiaService();
