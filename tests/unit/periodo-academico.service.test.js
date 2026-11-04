const test = require('node:test');
const assert = require('node:assert');
const periodoAcademicoService = require('../../src/services/periodo-academico.service');

test('actualiza un periodo sin tocar si esta activo', () => {
  const periodo = periodoAcademicoService.crear({ nombre: 'Matrículas 2027', anio: '2027' });
  periodoAcademicoService.activar(periodo.id);

  const editado = periodoAcademicoService.actualizar(periodo.id, { nombre: ' Matrículas 2027-1 ', anio: '2027', fechaInicio: '2027-01-10', fechaFin: '2027-02-10' });
  assert.strictEqual(editado.nombre, 'Matrículas 2027-1');
  assert.strictEqual(editado.anio, 2027);
  assert.strictEqual(editado.duracionDias(), 32);
  assert.strictEqual(editado.activo, true);

  const sinFechas = periodoAcademicoService.actualizar(periodo.id, { nombre: 'Matrículas 2027', anio: 2027, fechaInicio: '' });
  assert.strictEqual(sinFechas.fechaInicio, null);
  assert.strictEqual(sinFechas.tieneFechas(), false);
});

test('solo un periodo queda activo', () => {
  const otro = periodoAcademicoService.crear({ nombre: 'Matrículas 2028', anio: '2028' });
  periodoAcademicoService.activar(otro.id);
  assert.strictEqual(periodoAcademicoService.obtenerActivo().id, otro.id);
  assert.strictEqual(periodoAcademicoService.listar().filter(p => p.activo).length, 1);
  assert.throws(() => periodoAcademicoService.actualizar(99, { nombre: 'x', anio: 2027 }), /no encontrado/);
});
