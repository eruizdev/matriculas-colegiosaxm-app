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
    return this.usuarios.find(u => u.correo === correo.trim().toLowerCase());
  }

  findByTelefono(telefono) {
    return this.usuarios.find(u => u.telefono === telefono);
  }

  findByRol(rol) {
    return this.usuarios.filter(u => u.rol === rol);
  }

  existeCorreo(correo) {
    return Boolean(this.findByCorreo(correo));
  }

  existeTelefono(telefono, excluirId) {
    const usuario = this.findByTelefono(telefono);
    return Boolean(usuario) && usuario.id !== Number(excluirId);
  }

  create(data) {
    const usuario = new Usuario({
      ...data,
      id: this.siguienteId++,
      correo: data.correo.trim().toLowerCase()
    });
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
