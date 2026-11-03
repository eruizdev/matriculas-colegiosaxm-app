const test = require('node:test');
const assert = require('node:assert');
const cupoService = require('../../src/services/cupo.service');
const gradoService = require('../../src/services/grado.service');
const periodoAcademicoService = require('../../src/services/periodo-academico.service');

const periodo = periodoAcademicoService.crear({ nombre: 'Matrículas 2027', anio: 2027 });
periodoAcademicoService.activar(periodo.id);
const primero = gradoService.crear({ nombre: 'Primero', nivel: 'Primaria', orden: 1 });
const transicion = gradoService.crear({ nombre: 'Transición', nivel: 'Preescolar', orden: 0 });

test('crea cupos y no deja repetir grado, periodo y jornada', () => {
  cupoService.crear({ gradoId: primero.id, periodoId: periodo.id, jornada: 'Mañana', total: 30, ocupados: 10 });
  cupoService.crear({ gradoId: primero.id, periodoId: periodo.id, jornada: 'Tarde', total: 20, ocupados: 20 });
  cupoService.crear({ gradoId: transicion.id, periodoId: periodo.id, jornada: 'Mañana', total: 15, ocupados: 0 });

  assert.throws(
    () => cupoService.crear({ gradoId: primero.id, periodoId: periodo.id, jornada: 'Mañana', total: 5 }),
    /Ya existen cupos/
  );
});

test('lista los disponibles ordenados por grado y con filtros', () => {
  const cupos = cupoService.listarDisponibles();
  assert.strictEqual(cupos.length, 3);
  assert.strictEqual(cupos[0].grado, 'Transición');

  assert.strictEqual(cupoService.listarDisponibles({ jornada: 'Tarde' }).length, 1);
  assert.strictEqual(cupoService.listarDisponibles({ gradoId: primero.id }).length, 2);
});

test('resume los cupos por grado', () => {
  const resumen = cupoService.resumenPorGrado();
  const itemPrimero = resumen.find(r => r.grado === 'Primero');
  assert.strictEqual(itemPrimero.total, 50);
  assert.strictEqual(itemPrimero.disponibles, 20);
  assert.strictEqual(itemPrimero.jornadas.length, 2);
});

test('calcula los totales del periodo activo', () => {
  assert.deepStrictEqual(cupoService.totales(), { total: 65, ocupados: 30, disponibles: 35, porcentaje: 46 });
});

test('ocupa y libera cupos', () => {
  const [cupo] = cupoService.listarDisponibles({ gradoId: transicion.id });
  cupoService.ocupar(cupo.id, 3);
  assert.strictEqual(cupoService.obtener(cupo.id).ocupados, 3);
  cupoService.liberar(cupo.id);
  assert.strictEqual(cupoService.obtener(cupo.id).ocupados, 2);
  assert.throws(() => cupoService.ocupar(cupo.id, 100), /suficientes/);
});

test('no deja eliminar un grado que tiene cupos', () => {
  assert.throws(() => gradoService.eliminar(primero.id), /tiene cupos/);
});

test('oculta los cupos de grados inactivos', () => {
  gradoService.actualizar(transicion.id, { activo: false });
  assert.strictEqual(cupoService.listarDisponibles().length, 2);
});
