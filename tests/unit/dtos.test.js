const test = require('node:test');
const assert = require('node:assert');
const GradoDto = require('../../src/dtos/grado.dto');
const PeriodoAcademicoDto = require('../../src/dtos/periodo-academico.dto');
const MensajeContactoDto = require('../../src/dtos/mensaje-contacto.dto');
const FechaUtil = require('../../src/utils/fecha.util');

test('GradoDto arma nombre completo y estado', () => {
  const dto = GradoDto.desde({ id: 1, nombre: 'Primero', nivel: 'Primaria', orden: 1, activo: false });
  assert.strictEqual(dto.nombreCompleto, 'Primero - Primaria');
  assert.strictEqual(dto.estado, 'Inactivo');
});

test('PeriodoAcademicoDto formatea fechas sin correr el dia', () => {
  const dto = PeriodoAcademicoDto.desde({ id: 1, nombre: 'Matrículas 2027', anio: 2027, fechaInicio: '2027-01-15', activo: true });
  assert.strictEqual(dto.fechaInicio, '15 de enero de 2027');
  assert.strictEqual(dto.fechaFin, 'Sin fecha');
  assert.strictEqual(dto.estado, 'Activo');
});

test('MensajeContactoDto marca los nuevos y formatea la fecha', () => {
  const fecha = new Date(2026, 10, 3);
  const dto = MensajeContactoDto.desde({ id: 1, nombre: 'Ana', correo: 'ana@mail.com', asunto: 'Cupos', mensaje: 'Hola', leido: false, fecha });
  assert.strictEqual(dto.estado, 'Nuevo');
  assert.strictEqual(dto.fecha, FechaUtil.formatear(fecha));
});
