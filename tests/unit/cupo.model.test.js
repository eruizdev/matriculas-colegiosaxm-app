const test = require('node:test');
const assert = require('node:assert');
const Cupo = require('../../src/models/cupo.model');

test('calcula los cupos disponibles', () => {
  const cupo = new Cupo({ id: 1, gradoId: 1, periodoId: 1, jornada: 'Mañana', total: 30, ocupados: 12 });
  assert.strictEqual(cupo.disponibles(), 18);
  assert.strictEqual(cupo.hayDisponibles(), true);
});

test('sin cupos cuando todos estan ocupados', () => {
  const cupo = new Cupo({ id: 2, gradoId: 1, periodoId: 1, jornada: 'Tarde', total: 25, ocupados: 25 });
  assert.strictEqual(cupo.hayDisponibles(), false);
});
