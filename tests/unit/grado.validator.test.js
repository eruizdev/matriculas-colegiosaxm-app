const test = require('node:test');
const assert = require('node:assert');
const GradoValidator = require('../../src/validators/grado.validator');
const Nivel = require('../../src/constants/nivel');

const validar = data => GradoValidator.validar({ nombre: 'Primero', nivel: Nivel.PRIMARIA, ...data });

test('acepta un grado correcto con o sin orden', () => {
  assert.deepStrictEqual(validar({}), []);
  assert.deepStrictEqual(validar({ orden: '' }), []);
  assert.deepStrictEqual(validar({ orden: '0' }), []);
  assert.deepStrictEqual(validar({ nivel: Nivel.MEDIA, orden: 11 }), []);
});

test('revisa el largo del nombre', () => {
  assert.match(validar({ nombre: ' 1A ' })[0], /entre 3 y 40/);
  assert.match(validar({ nombre: 'a'.repeat(41) })[0], /entre 3 y 40/);
  assert.match(validar({ nombre: undefined })[0], /entre 3 y 40/);
});

test('solo acepta niveles validos', () => {
  assert.match(validar({ nivel: 'Universidad' })[0], /nivel válido/);
  assert.match(validar({ nivel: 'primaria' })[0], /nivel válido/);
  assert.match(validar({ nivel: '' })[0], /nivel válido/);
});

test('el orden debe ser entero desde 0', () => {
  assert.match(validar({ orden: '-1' })[0], /entero desde 0/);
  assert.match(validar({ orden: '1.5' })[0], /entero desde 0/);
  assert.match(validar({ orden: 'abc' })[0], /entero desde 0/);
});
