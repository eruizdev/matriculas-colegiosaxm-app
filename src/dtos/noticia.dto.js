const FechaUtil = require('../utils/fecha.util');

class NoticiaDto {
  static desde(noticia) {
    return {
      id: noticia.id,
      titulo: noticia.titulo,
      contenido: noticia.contenido,
      resumen: noticia.resumen(),
      publicada: noticia.publicada,
      fecha: FechaUtil.formatear(noticia.fecha)
    };
  }
}

module.exports = NoticiaDto;
