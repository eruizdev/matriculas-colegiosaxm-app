const test = require('node:test');
const assert = require('node:assert');
const RolUtil = require('../../src/utils/rol.util');
const RolMiddleware = require('../../src/middlewares/rol.middleware');
const Roles = require('../../src/constants/roles');
const { Permisos } = require('../../src/constants/permisos');
const { ForbiddenError, UnauthorizedError } = require('../../src/errors');

const ejecutar = (middleware, usuario) => {
  let resultado = 'sin llamar';
  middleware({ session: { usuario } }, {}, error => {
    resultado = error || 'paso';
  });
  return resultado;
};

test('valida y nombra los roles', () => {
  assert.strictEqual(RolUtil.esValido(Roles.ADMIN), true);
  assert.strictEqual(RolUtil.esValido('superusuario'), false);
  assert.strictEqual(RolUtil.nombre(Roles.PADRE), 'Padre de familia');
  assert.strictEqual(RolUtil.listar().length, 2);
});

test('permisos de cada rol', () => {
  assert.strictEqual(RolUtil.tienePermiso(Roles.ADMIN, Permisos.GESTIONAR_CUPOS), true);
  assert.strictEqual(RolUtil.tienePermiso(Roles.PADRE, Permisos.GESTIONAR_CUPOS), false);
  assert.strictEqual(RolUtil.tienePermiso(Roles.PADRE, Permisos.VER_CUPOS_DETALLE), true);
  assert.strictEqual(RolUtil.tienePermiso('otro', Permisos.VER_PANEL), false);
});

test('ruta de inicio y rutas permitidas por rol', () => {
  assert.strictEqual(RolUtil.rutaInicio(Roles.ADMIN), '/admin');
  assert.strictEqual(RolUtil.rutaInicio(Roles.PADRE), '/padre/perfil');
  assert.strictEqual(RolUtil.puedeEntrar(Roles.PADRE, '/admin/cupos'), false);
  assert.strictEqual(RolUtil.puedeEntrar(Roles.PADRE, '/padre/cupos'), true);
  assert.strictEqual(RolUtil.puedeEntrar(Roles.ADMIN, '/cupos'), true);
});

test('middleware permitir por rol', () => {
  const soloAdmin = RolMiddleware.permitir(Roles.ADMIN);
  assert.strictEqual(ejecutar(soloAdmin, { rol: Roles.ADMIN }), 'paso');
  assert.ok(ejecutar(soloAdmin, { rol: Roles.PADRE }) instanceof ForbiddenError);
  assert.ok(ejecutar(soloAdmin, undefined) instanceof UnauthorizedError);
  assert.throws(() => RolMiddleware.permitir('inventado'), /Rol no válido/);
});

test('middleware requiere permiso', () => {
  const gestionarUsuarios = RolMiddleware.requierePermiso(Permisos.GESTIONAR_USUARIOS);
  assert.strictEqual(ejecutar(gestionarUsuarios, { rol: Roles.ADMIN }), 'paso');
  assert.ok(ejecutar(gestionarUsuarios, { rol: Roles.PADRE }) instanceof ForbiddenError);
});
