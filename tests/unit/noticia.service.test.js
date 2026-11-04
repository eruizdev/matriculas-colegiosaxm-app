const test = require('node:test');
const assert = require('node:assert');
const noticiaService = require('../../src/services/noticia.service');

test('obtiene, actualiza, publica y elimina noticias', () => {
  const noticia = noticiaService.crear({ titulo: 'Abiertas', contenido: 'Ya abrimos matrículas' });
  assert.strictEqual(noticiaService.obtener(noticia.id).titulo, 'Abiertas');
  assert.throws(() => noticiaService.obtenerPublicada(noticia.id), /no encontrada/);

  const editada = noticiaService.actualizar(noticia.id, { titulo: ' Matrículas abiertas ', contenido: 'Desde el lunes', publicada: 'on' });
  assert.strictEqual(editada.titulo, 'Matrículas abiertas');
  assert.strictEqual(noticiaService.obtenerPublicada(noticia.id).contenido, 'Desde el lunes');
  assert.strictEqual(noticiaService.listarPublicadas().length, 1);

  noticiaService.cambiarEstado(noticia.id);
  assert.strictEqual(noticiaService.listarPublicadas().length, 0);

  noticiaService.eliminar(noticia.id);
  assert.throws(() => noticiaService.obtener(noticia.id), /no encontrada/);
  assert.throws(() => noticiaService.actualizar(99, { titulo: 'x', contenido: 'x' }), /no encontrada/);
});
