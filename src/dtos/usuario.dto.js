const TipoDocumento = require('../constants/tipo-documento');

class UsuarioDto {
  static desde(usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      nombreCompleto: usuario.nombreCompleto(),
      tipoDocumento: TipoDocumento[usuario.tipoDocumento] || '',
      numeroDocumento: usuario.numeroDocumento,
      correo: usuario.correo,
      telefono: usuario.telefono,
      rol: usuario.rol,
      activo: usuario.activo
    };
  }
}

module.exports = UsuarioDto;
