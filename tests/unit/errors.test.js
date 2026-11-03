const test = require('node:test');
const assert = require('node:assert');
const {
  AppError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError
} = require('../../src/errors');

test('cada error tiene su codigo http', () => {
  assert.strictEqual(new BadRequestError().statusCode, 400);
  assert.strictEqual(new ValidationError().statusCode, 400);
  assert.strictEqual(new UnauthorizedError().statusCode, 401);
  assert.strictEqual(new ForbiddenError().statusCode, 403);
  assert.strictEqual(new NotFoundError().statusCode, 404);
  assert.strictEqual(new ConflictError().statusCode, 409);
  assert.strictEqual(new AppError('falla').statusCode, 500);
});

test('todos heredan de AppError y de Error', () => {
  const error = new ConflictError('Ya existe');
  assert.ok(error instanceof AppError);
  assert.ok(error instanceof Error);
  assert.strictEqual(error.name, 'ConflictError');
  assert.strictEqual(error.message, 'Ya existe');
});

test('distingue errores del cliente y del servidor', () => {
  assert.strictEqual(AppError.esDelCliente(new NotFoundError()), true);
  assert.strictEqual(AppError.esDelCliente(new AppError('falla')), false);
  assert.strictEqual(AppError.esDelCliente(new Error('otro')), false);
});

test('ValidationError guarda la lista de errores', () => {
  const error = new ValidationError(['Falta el nombre', 'Correo inválido']);
  assert.deepStrictEqual(error.mensajes(), ['Falta el nombre', 'Correo inválido']);
  assert.deepStrictEqual(new NotFoundError('No está').mensajes(), ['No está']);
});

test('convierte el error a json', () => {
  const json = new ForbiddenError('Sin permiso').toJSON();
  assert.deepStrictEqual(json, { error: 'ForbiddenError', status: 403, mensaje: 'Sin permiso', detalles: [] });
});
