const Usuario = require('../models/usuario.model');

class UsuarioRepository {
  constructor() {
    this.usuarios = [];
    this.siguienteId = 1;
  }

  findAll() {
    return this.usuarios;
  }

  findById(id) {
    return this.usuarios.find(u => u.id === Number(id));
  }

  findByCorreo(correo) {
    return this.usuarios.find(u => u.correo === correo.toLowerCase());
  }

  findByRol(rol) {
    return this.usuarios.filter(u => u.rol === rol);
  }

  create(data) {
    const usuario = new Usuario({ ...data, id: this.siguienteId++, correo: data.correo.toLowerCase() });
    this.usuarios.push(usuario);
    return usuario;
  }

  update(id, data) {
    const usuario = this.findById(id);
    if (!usuario) return null;
    Object.assign(usuario, data);
    return usuario;
  }

  delete(id) {
    const index = this.usuarios.findIndex(u => u.id === Number(id));
    if (index === -1) return false;
    this.usuarios.splice(index, 1);
    return true;
  }
}

module.exports = new UsuarioRepository();
