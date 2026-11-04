const BaseRepository = require('./base.repository');
const Usuario = require('../models/usuario.model');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  findByCorreo(correo) {
    return this.findOneBy(u => u.correo === correo.trim().toLowerCase());
  }

  findByTelefono(telefono) {
    return this.findOneBy(u => u.telefono === telefono);
  }

  findByRol(rol) {
    return this.findBy(u => u.rol === rol);
  }

  existeCorreo(correo) {
    return Boolean(this.findByCorreo(correo));
  }

  existeTelefono(telefono, excluirId) {
    const usuario = this.findByTelefono(telefono);
    return Boolean(usuario) && usuario.id !== Number(excluirId);
  }

  create(data) {
    return super.create({ ...data, correo: data.correo.trim().toLowerCase() });
  }
}

module.exports = new UsuarioRepository();
