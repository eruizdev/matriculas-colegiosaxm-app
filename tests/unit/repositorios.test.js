const test = require('node:test');
const assert = require('node:assert');
const BaseRepository = require('../../src/repositories/base.repository');
const gradoRepository = require('../../src/repositories/grado.repository');
const periodoAcademicoRepository = require('../../src/repositories/periodo-academico.repository');
const requisitoRepository = require('../../src/repositories/requisito.repository');
const mensajeContactoRepository = require('../../src/repositories/mensaje-contacto.repository');

class Item {
  constructor({ id, nombre, activo = true }) {
    this.id = id;
    this.nombre = nombre;
    this.activo = activo;
  }
}

test('BaseRepository crea, busca, cuenta, actualiza y elimina', () => {
  const repositorio = new BaseRepository(Item);
  const uno = repositorio.create({ nombre: 'Uno' });
  repositorio.create({ nombre: 'Dos', activo: false });

  assert.ok(uno instanceof Item);
  assert.strictEqual(uno.id, 1);
  assert.strictEqual(repositorio.findById('2').nombre, 'Dos');
  assert.strictEqual(repositorio.findBy(i => i.activo).length, 1);
  assert.strictEqual(repositorio.findOneBy(i => i.nombre === 'Dos').id, 2);
  assert.strictEqual(repositorio.count(), 2);
  assert.strictEqual(repositorio.count(i => !i.activo), 1);

  assert.strictEqual(repositorio.update(1, { nombre: 'Uno editado' }).nombre, 'Uno editado');
  assert.strictEqual(repositorio.update(99, {}), null);
  assert.strictEqual(repositorio.delete(1), true);
  assert.strictEqual(repositorio.delete(1), false);
  assert.strictEqual(repositorio.create({ nombre: 'Tres' }).id, 3);
});

test('findAll devuelve una copia', () => {
  const repositorio = new BaseRepository(Item);
  repositorio.create({ nombre: 'Uno' });
  repositorio.findAll().pop();
  assert.strictEqual(repositorio.count(), 1);
});

test('metodos propios de cada repositorio', () => {
  gradoRepository.create({ nombre: 'Segundo', nivel: 'Primaria', orden: 2 });
  gradoRepository.create({ nombre: 'Primero', nivel: 'Primaria', orden: 1, activo: false });
  assert.deepStrictEqual(gradoRepository.findAll().map(g => g.nombre), ['Primero', 'Segundo']);
  assert.strictEqual(gradoRepository.findActivos().length, 1);
  assert.strictEqual(gradoRepository.existeNombre(' primero '), true);
  assert.strictEqual(gradoRepository.existeNombre('Primero', 2), false);

  periodoAcademicoRepository.create({ nombre: 'Matrículas 2027', anio: 2027 });
  assert.strictEqual(periodoAcademicoRepository.findByAnio('2027').length, 1);
  assert.strictEqual(periodoAcademicoRepository.findByAnio(2030).length, 0);

  requisitoRepository.create({ titulo: 'Registro civil', descripcion: 'Copia' });
  requisitoRepository.create({ titulo: 'Foto', descripcion: '3x4', obligatorio: false });
  assert.strictEqual(requisitoRepository.findObligatorios().length, 1);

  const mensaje = mensajeContactoRepository.create({ nombre: 'Ana', correo: 'ana@mail.com', asunto: 'Cupos', mensaje: 'Hola' });
  assert.strictEqual(mensajeContactoRepository.contarNoLeidos(), 1);
  mensaje.marcarLeido();
  assert.strictEqual(mensajeContactoRepository.contarNoLeidos(), 0);
});
