const test = require('node:test');
const assert = require('node:assert');
const authService = require('../../src/services/auth.service');
const usuarioService = require('../../src/services/usuario.service');
const Roles = require('../../src/constants/roles');

const datos = (nombre, telefono, correo) => ({ nombre, telefono, correo, password: '123456' });

test('roles, estado y protecciones del administrador', async () => {
  const admin = await authService.crearAdmin(datos('Admin Uno', '3000000001', 'admin1@colegio.com'));
  const padre = await authService.registrar(datos('Padre Uno', '3000000002', 'padre1@mail.com'));

  assert.strictEqual(admin.rol, Roles.ADMIN);
  assert.strictEqual(admin.nombreRol, 'Administrador');
  assert.strictEqual(usuarioService.listar({ rol: Roles.PADRE }).length, 1);

  assert.throws(() => usuarioService.cambiarEstado(admin.id, admin.id), /propia cuenta/);
  assert.throws(() => usuarioService.cambiarRol(admin.id, Roles.PADRE, admin.id), /propio rol/);
  assert.throws(() => usuarioService.cambiarRol(padre.id, 'jefe', admin.id), /no es válido/);

  const otroAdmin = usuarioService.cambiarRol(padre.id, Roles.ADMIN, admin.id);
  assert.strictEqual(otroAdmin.rol, Roles.ADMIN);
  assert.strictEqual(usuarioService.contarAdminsActivos(), 2);

  usuarioService.cambiarEstado(admin.id, otroAdmin.id);
  assert.throws(() => usuarioService.cambiarRol(otroAdmin.id, Roles.PADRE, admin.id), /único administrador/);
  assert.throws(() => usuarioService.cambiarEstado(otroAdmin.id, admin.id), /único administrador/);

  await assert.rejects(authService.login('admin1@colegio.com', '123456'), /desactivada/);
});
