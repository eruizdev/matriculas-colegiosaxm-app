const test = require('node:test');
const assert = require('node:assert');
const Grado = require('../../src/models/grado.model');
const PeriodoAcademico = require('../../src/models/periodo-academico.model');
const Noticia = require('../../src/models/noticia.model');
const MensajeContacto = require('../../src/models/mensaje-contacto.model');
const Requisito = require('../../src/models/requisito.model');
const Usuario = require('../../src/models/usuario.model');
const Colegio = require('../../src/models/colegio.model');
const ResumenGrado = require('../../src/models/resumen-grado.model');
const ColegioValidator = require('../../src/validators/colegio.validator');
const Roles = require('../../src/constants/roles');

test('grado se activa, desactiva y arma su nombre', () => {
  const grado = new Grado({ id: 1, nombre: 'Primero', nivel: 'Primaria' });
  grado.desactivar();
  assert.strictEqual(grado.activo, false);
  grado.activar();
  assert.strictEqual(grado.activo, true);
  grado.cambiarEstado();
  assert.strictEqual(grado.activo, false);
  assert.strictEqual(grado.nombreCompleto(), 'Primero - Primaria');
});

test('periodo sabe si esta vigente y cuantos dias dura', () => {
  const periodo = new PeriodoAcademico({ id: 1, nombre: 'Matrículas 2027', anio: 2027, fechaInicio: '2027-01-01', fechaFin: '2027-01-31' });
  assert.strictEqual(periodo.duracionDias(), 31);
  assert.strictEqual(periodo.estaVigente(new Date(2027, 0, 15)), true);
  assert.strictEqual(periodo.estaVigente(new Date(2027, 0, 31, 18)), true);
  assert.strictEqual(periodo.estaVigente(new Date(2027, 1, 1)), false);

  const sinFechas = new PeriodoAcademico({ id: 2, nombre: 'Sin fechas', anio: 2027 });
  assert.strictEqual(sinFechas.duracionDias(), 0);
  assert.strictEqual(sinFechas.estaVigente(), false);

  periodo.activar();
  assert.strictEqual(periodo.activo, true);
  periodo.desactivar();
  assert.strictEqual(periodo.activo, false);
});

test('noticia se publica, se oculta y corta su resumen', () => {
  const noticia = new Noticia({ id: 1, titulo: 'Abiertas', contenido: 'a'.repeat(150) });
  noticia.publicar();
  assert.strictEqual(noticia.publicada, true);
  noticia.ocultar();
  assert.strictEqual(noticia.publicada, false);
  assert.strictEqual(noticia.resumen().length, Noticia.LARGO_RESUMEN + 3);
  assert.strictEqual(new Noticia({ id: 2, titulo: 'Corta', contenido: 'Hola' }).resumen(), 'Hola');
});

test('mensaje empieza nuevo y se marca leido', () => {
  const mensaje = new MensajeContacto({ id: 1, nombre: 'Ana', correo: 'ana@mail.com', asunto: 'Cupos', mensaje: 'Hola' });
  assert.strictEqual(mensaje.esNuevo(), true);
  mensaje.marcarLeido();
  assert.strictEqual(mensaje.esNuevo(), false);
});

test('requisito es obligatorio por defecto', () => {
  assert.strictEqual(new Requisito({ id: 1, titulo: 'Registro civil' }).esObligatorio(), true);
  assert.strictEqual(new Requisito({ id: 2, titulo: 'Foto', obligatorio: false }).esObligatorio(), false);
});

test('usuario cambia estado, rol, perfil y contraseña', () => {
  const usuario = new Usuario({ id: 1, nombre: 'Ana', telefono: '3001234567', correo: 'ana@mail.com', password: 'viejo' });
  usuario.desactivar();
  assert.strictEqual(usuario.activo, false);
  usuario.activar();
  usuario.cambiarEstado();
  assert.strictEqual(usuario.activo, false);

  assert.strictEqual(usuario.cambiarRol(Roles.ADMIN), true);
  assert.strictEqual(usuario.esAdmin(), true);
  assert.strictEqual(usuario.cambiarRol('jefe'), false);
  assert.strictEqual(usuario.rol, Roles.ADMIN);

  usuario.actualizarPerfil({ nombre: '  Ana Gómez ', telefono: '3119998888' });
  assert.strictEqual(usuario.nombre, 'Ana Gómez');
  assert.strictEqual(usuario.telefono, '3119998888');

  usuario.cambiarPassword('nuevo');
  assert.strictEqual(usuario.password, 'nuevo');
});

test('colegio se actualiza y sabe si tiene datos de contacto', () => {
  const colegio = new Colegio();
  assert.strictEqual(colegio.nombre, 'Colegio');
  assert.strictEqual(colegio.tieneContacto(), false);
  colegio.actualizar({ nombre: ' Colegio Central ', correo: 'INFO@colegio.com' });
  assert.strictEqual(colegio.nombre, 'Colegio Central');
  assert.strictEqual(colegio.correo, 'info@colegio.com');
  assert.strictEqual(colegio.tieneContacto(), true);
});

test('validador del colegio', () => {
  assert.deepStrictEqual(ColegioValidator.validar({ nombre: 'Colegio Central' }), []);
  assert.strictEqual(ColegioValidator.validar({ nombre: 'C', telefono: '12', correo: 'malo' }).length, 3);
});

test('resumen de grado suma cupos y dice si hay disponibles', () => {
  const resumen = new ResumenGrado({ gradoId: 1, grado: 'Primero', nivel: 'Primaria' });
  assert.strictEqual(resumen.hayDisponibles(), false);
  resumen.agregar({ jornada: 'Mañana', total: 30, disponibles: 0, estado: 'Agotado' });
  assert.strictEqual(resumen.hayDisponibles(), false);
  resumen.agregar({ jornada: 'Tarde', total: 20, disponibles: 4, estado: 'Pocos cupos' });
  assert.strictEqual(resumen.total, 50);
  assert.strictEqual(resumen.disponibles, 4);
  assert.strictEqual(resumen.jornadas.length, 2);
  assert.strictEqual(resumen.hayDisponibles(), true);
});
