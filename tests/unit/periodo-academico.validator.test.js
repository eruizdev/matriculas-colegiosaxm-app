const test = require('node:test');
const assert = require('node:assert');
const PeriodoAcademicoValidator = require('../../src/validators/periodo-academico.validator');
const FechaUtil = require('../../src/utils/fecha.util');

const anio = FechaUtil.anioActual();
const validar = data => PeriodoAcademicoValidator.validar({ nombre: 'Matrículas', anio, ...data });

test('acepta un periodo correcto con o sin fechas', () => {
  assert.deepStrictEqual(validar({}), []);
  assert.deepStrictEqual(validar({ fechaInicio: `${anio}-01-10`, fechaFin: `${anio}-01-10` }), []);
  assert.deepStrictEqual(validar({ anio: anio + 5 }), []);
});

test('revisa el largo del nombre', () => {
  assert.match(validar({ nombre: ' Ma ' })[0], /entre 3 y 60/);
  assert.match(validar({ nombre: 'a'.repeat(61) })[0], /entre 3 y 60/);
});

test('revisa que el año este en el rango', () => {
  assert.match(validar({ anio: anio - 1 })[0], /El año debe estar entre/);
  assert.match(validar({ anio: anio + 6 })[0], /El año debe estar entre/);
  assert.match(validar({ anio: 'abc' })[0], /El año debe estar entre/);
  assert.match(validar({ anio: '' })[0], /El año debe estar entre/);
});

test('revisa las fechas', () => {
  assert.match(validar({ fechaInicio: `${anio}-01-10` })[0], /inicio y la de fin/);
  assert.match(validar({ fechaFin: `${anio}-01-10` })[0], /inicio y la de fin/);
  assert.match(validar({ fechaInicio: '10/01/2026', fechaFin: '20/01/2026' })[0], /formato válido/);
  assert.match(validar({ fechaInicio: `${anio}-02-01`, fechaFin: `${anio}-01-31` })[0], /antes de la fecha de inicio/);
});
