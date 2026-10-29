const FechaUtil = require('../utils/fecha.util');

class UsuarioDto {
  static desde(usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      correo: usuario.correo,
      rol: usuario.rol,
      activo: usuario.activo,
      fechaRegistro: FechaUtil.formatear(usuario.fechaRegistro),
      ultimoAcceso: usuario.ultimoAcceso ? FechaUtil.formatear(usuario.ultimoAcceso) : 'Nunca'
    };
  }
}

module.exports = UsuarioDto;
