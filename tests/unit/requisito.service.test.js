const test = require('node:test');
const assert = require('node:assert');
const requisitoService = require('../../src/services/requisito.service');

test('lista los requisitos obligatorios y actualiza solo sus campos', () => {
  const registro = requisitoService.crear({ titulo: 'Registro civil', descripcion: 'Copia', orden: '2', obligatorio: 'on' });
  const foto = requisitoService.crear({ titulo: 'Foto', descripcion: '3x4', orden: '1' });

  assert.deepStrictEqual(requisitoService.listar().map(r => r.titulo), ['Foto', 'Registro civil']);
  assert.deepStrictEqual(requisitoService.listarObligatorios().map(r => r.titulo), ['Registro civil']);

  const editado = requisitoService.actualizar(foto.id, { titulo: ' Foto 3x4 ', descripcion: 'Fondo blanco', orden: '3', obligatorio: 'on', id: 99 });
  assert.strictEqual(editado.id, foto.id);
  assert.strictEqual(editado.titulo, 'Foto 3x4');
  assert.strictEqual(editado.orden, 3);
  assert.strictEqual(requisitoService.listarObligatorios().length, 2);

  requisitoService.eliminar(registro.id);
  assert.throws(() => requisitoService.obtener(registro.id), /no encontrado/);
});
