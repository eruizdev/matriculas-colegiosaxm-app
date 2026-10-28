const FechaUtil = require('../utils/fecha.util');

class NoticiaDto {
  static desde(noticia) {
    const resumen = noticia.contenido.length > 120
      ? noticia.contenido.substring(0, 120) + '...'
      : noticia.contenido;

    return {
      id: noticia.id,
      titulo: noticia.titulo,
      contenido: noticia.contenido,
      resumen,
      publicada: noticia.publicada,
      fecha: FechaUtil.formatear(noticia.fecha)
    };
  }
}

module.exports = NoticiaDto;
