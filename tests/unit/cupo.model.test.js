const test = require('node:test');
const assert = require('node:assert');
const Cupo = require('../../src/models/cupo.model');

const nuevoCupo = (total, ocupados) => new Cupo({ id: 1, gradoId: 1, periodoId: 1, jornada: 'Mañana', total, ocupados });

test('calcula los cupos disponibles', () => {
  const cupo = nuevoCupo(30, 12);
  assert.strictEqual(cupo.disponibles(), 18);
  assert.strictEqual(cupo.hayDisponibles(), true);
});

test('sin cupos cuando todos estan ocupados', () => {
  const cupo = nuevoCupo(25, 25);
  assert.strictEqual(cupo.hayDisponibles(), false);
});

test('calcula el porcentaje de ocupacion', () => {
  assert.strictEqual(nuevoCupo(40, 10).porcentajeOcupacion(), 25);
  assert.strictEqual(nuevoCupo(0, 0).porcentajeOcupacion(), 0);
});

test('estado segun los cupos disponibles', () => {
  assert.strictEqual(nuevoCupo(30, 10).estado(), 'Disponible');
  assert.strictEqual(nuevoCupo(30, 26).estado(), 'Pocos cupos');
  assert.strictEqual(nuevoCupo(30, 30).estado(), 'Agotado');
});

test('ocupar y liberar cupos', () => {
  const cupo = nuevoCupo(3, 1);
  assert.strictEqual(cupo.ocupar(2), true);
  assert.strictEqual(cupo.ocupados, 3);
  assert.strictEqual(cupo.ocupar(), false);
  assert.strictEqual(cupo.liberar(), true);
  assert.strictEqual(cupo.ocupados, 2);
  assert.strictEqual(cupo.liberar(5), false);
});
