class Colegio {
  constructor({ nombre = 'Colegio', direccion = '', telefono = '', correo = '', horario = '' } = {}) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.correo = correo;
    this.horario = horario;
  }

  actualizar({ nombre, direccion, telefono, correo, horario }) {
    this.nombre = nombre.trim();
    this.direccion = (direccion || '').trim();
    this.telefono = (telefono || '').trim();
    this.correo = (correo || '').trim().toLowerCase();
    this.horario = (horario || '').trim();
  }

  tieneContacto() {
    return Boolean(this.direccion || this.telefono || this.correo || this.horario);
  }
}

module.exports = Colegio;
