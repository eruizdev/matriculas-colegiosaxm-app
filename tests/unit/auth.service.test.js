const test = require('node:test');
const assert = require('node:assert');
const authService = require('../../src/services/auth.service');
const AuthValidator = require('../../src/validators/auth.validator');

const padre = {
  nombre: 'Ana Gomez',
  telefono: '3001234567',
  correo: 'Ana@Mail.com',
  password: '123456',
  confirmarPassword: '123456'
};

test('valida los campos del registro', () => {
  assert.deepStrictEqual(AuthValidator.validarRegistro(padre), []);

  const errores = AuthValidator.validarRegistro({ nombre: 'A', telefono: '12', correo: 'malo', password: '1', confirmarPassword: '2' });
  assert.strictEqual(errores.length, 5);
});

test('registra un padre y guarda el correo en minusculas', async () => {
  const usuario = await authService.registrar(padre);
  assert.strictEqual(usuario.correo, 'ana@mail.com');
  assert.strictEqual(usuario.rol, 'padre');
  assert.strictEqual(usuario.password, undefined);
});

test('no deja repetir correo ni telefono', async () => {
  await assert.rejects(authService.registrar(padre), /correo/);
  await assert.rejects(authService.registrar({ ...padre, correo: 'otro@mail.com' }), /teléfono/);
});

test('login con correo y contraseña', async () => {
  const usuario = await authService.login('ana@mail.com', '123456');
  assert.strictEqual(usuario.nombre, 'Ana Gomez');
  await assert.rejects(authService.login('ana@mail.com', 'incorrecta'), /incorrectos/);
  await assert.rejects(authService.login('nadie@mail.com', '123456'), /incorrectos/);
});

test('cambia la contraseña', async () => {
  const { id } = await authService.login('ana@mail.com', '123456');
  await assert.rejects(authService.cambiarPassword(id, 'mala', 'nueva123'), /actual/);
  await authService.cambiarPassword(id, '123456', 'nueva123');
  const usuario = await authService.login('ana@mail.com', 'nueva123');
  assert.strictEqual(usuario.id, id);
});
