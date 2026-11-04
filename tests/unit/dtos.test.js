const test = require('node:test');
const assert = require('node:assert');
const GradoDto = require('../../src/dtos/grado.dto');
const PeriodoAcademicoDto = require('../../src/dtos/periodo-academico.dto');
const MensajeContactoDto = require('../../src/dtos/mensaje-contacto.dto');
const FechaUtil = require('../../src/utils/fecha.util');
const Grado = require('../../src/models/grado.model');
const PeriodoAcademico = require('../../src/models/periodo-academico.model');
const MensajeContacto = require('../../src/models/mensaje-contacto.model');
const RequisitoDto = require('../../src/dtos/requisito.dto');
const ColegioDto = require('../../src/dtos/colegio.dto');
const Requisito = require('../../src/models/requisito.model');
const Colegio = require('../../src/models/colegio.model');
const CupoDto = require('../../src/dtos/cupo.dto');
const CupoDisponibleDto = require('../../src/dtos/cupo-disponible.dto');
const ResumenGradoDto = require('../../src/dtos/resumen-grado.dto');
const TotalesCupoDto = require('../../src/dtos/totales-cupo.dto');
const Cupo = require('../../src/models/cupo.model');
const ResumenGrado = require('../../src/models/resumen-grado.model');

test('GradoDto arma nombre completo y estado', () => {
  const dto = GradoDto.desde(new Grado({ id: 1, nombre: 'Primero', nivel: 'Primaria', orden: 1, activo: false }));
  assert.strictEqual(dto.nombreCompleto, 'Primero - Primaria');
  assert.strictEqual(dto.estado, 'Inactivo');
});

test('PeriodoAcademicoDto formatea fechas sin correr el dia', () => {
  const dto = PeriodoAcademicoDto.desde(new PeriodoAcademico({ id: 1, nombre: 'Matrículas 2027', anio: 2027, fechaInicio: '2027-01-15', activo: true }));
  assert.strictEqual(dto.fechaInicio, '15 de enero de 2027');
  assert.strictEqual(dto.fechaFin, 'Sin fecha');
  assert.strictEqual(dto.estado, 'Activo');
});

test('MensajeContactoDto marca los nuevos y formatea la fecha', () => {
  const fecha = new Date(2026, 10, 3);
  const dto = MensajeContactoDto.desde(new MensajeContacto({ id: 1, nombre: 'Ana', correo: 'ana@mail.com', asunto: 'Cupos', mensaje: 'Hola', leido: false, fecha }));
  assert.strictEqual(dto.estado, 'Nuevo');
  assert.strictEqual(dto.fecha, FechaUtil.formatear(fecha));
});

test('RequisitoDto dice si es obligatorio u opcional', () => {
  const obligatorio = RequisitoDto.desde(new Requisito({ id: 1, titulo: 'Registro civil', descripcion: 'Copia' }));
  const opcional = RequisitoDto.desde(new Requisito({ id: 2, titulo: 'Foto', descripcion: '3x4', obligatorio: false }));
  assert.strictEqual(obligatorio.tipo, 'Obligatorio');
  assert.strictEqual(opcional.tipo, 'Opcional');
  assert.strictEqual(opcional.obligatorio, false);
});

test('ColegioDto arma el contacto corto y la lista de datos', () => {
  const vacio = ColegioDto.desde(new Colegio());
  assert.strictEqual(vacio.tieneContacto, false);
  assert.strictEqual(vacio.contactoCorto, '');
  assert.deepStrictEqual(vacio.datosContacto, []);

  const dto = ColegioDto.desde(new Colegio({ nombre: 'Colegio Central', telefono: '6041234567', correo: 'info@colegio.com', horario: 'Lunes a viernes' }));
  assert.strictEqual(dto.contactoCorto, '6041234567 · info@colegio.com');
  assert.deepStrictEqual(dto.datosContacto.map(d => d.etiqueta), ['Teléfono', 'Correo', 'Horario']);
});

test('CupoDto trae los datos del admin y CupoDisponibleDto oculta los ocupados', () => {
  const cupo = new Cupo({ id: 1, gradoId: 1, periodoId: 1, jornada: 'Mañana', total: 30, ocupados: 28 });
  const grado = new Grado({ id: 1, nombre: 'Primero', nivel: 'Primaria' });
  const periodo = new PeriodoAcademico({ id: 1, nombre: 'Matrículas 2027', anio: 2027 });

  const admin = CupoDto.desde(cupo, grado, periodo);
  assert.strictEqual(admin.ocupados, 28);
  assert.strictEqual(admin.periodo, 'Matrículas 2027');
  assert.strictEqual(admin.puedeLiberar, true);

  const publico = CupoDisponibleDto.desde(cupo, grado);
  assert.strictEqual(publico.ocupados, undefined);
  assert.strictEqual(publico.disponibles, 2);
  assert.strictEqual(publico.grado, 'Primero');
});

test('ResumenGradoDto suma las jornadas de un grado', () => {
  const resumen = new ResumenGrado({ gradoId: 1, grado: 'Primero', nivel: 'Primaria' });
  resumen.agregar({ jornada: 'Mañana', total: 30, disponibles: 0, estado: 'Agotado' });
  resumen.agregar({ jornada: 'Tarde', total: 20, disponibles: 5, estado: 'Pocos cupos' });
  const dto = ResumenGradoDto.desde(resumen);
  assert.strictEqual(dto.total, 50);
  assert.strictEqual(dto.disponibles, 5);
  assert.strictEqual(dto.hayDisponibles, true);
  assert.deepStrictEqual(dto.jornadas, [{ jornada: 'Mañana', estado: 'Agotado' }, { jornada: 'Tarde', estado: 'Pocos cupos' }]);
});

test('TotalesCupoDto calcula el porcentaje de ocupacion', () => {
  const cupos = [new Cupo({ id: 1, total: 30, ocupados: 15 }), new Cupo({ id: 2, total: 10, ocupados: 10 })];
  assert.deepStrictEqual(TotalesCupoDto.desde(cupos), { total: 40, ocupados: 25, disponibles: 15, porcentaje: 63 });
  assert.deepStrictEqual(TotalesCupoDto.desde([]), { total: 0, ocupados: 0, disponibles: 0, porcentaje: 0 });
});
