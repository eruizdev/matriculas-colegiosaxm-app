const Roles = require('../constants/roles');
const { PermisosPorRol } = require('../constants/permisos');

const NombresRol = Object.freeze({
  [Roles.ADMIN]: 'Administrador',
  [Roles.PADRE]: 'Padre de familia'
});

const RutasInicio = Object.freeze({
  [Roles.ADMIN]: '/admin',
  [Roles.PADRE]: '/padre/perfil'
});

class RolUtil {
  static esValido(rol) {
    return Object.values(Roles).includes(rol);
  }

  static nombre(rol) {
    return NombresRol[rol] || 'Sin rol';
  }

  static listar() {
    return Object.values(Roles).map(rol => ({ valor: rol, nombre: RolUtil.nombre(rol) }));
  }

  static permisos(rol) {
    return PermisosPorRol[rol] || [];
  }

  static tienePermiso(rol, permiso) {
    return RolUtil.permisos(rol).includes(permiso);
  }

  static rutaInicio(rol) {
    return RutasInicio[rol] || '/';
  }

  static puedeEntrar(rol, ruta) {
    if (ruta.startsWith('/admin')) return rol === Roles.ADMIN;
    if (ruta.startsWith('/padre')) return rol === Roles.PADRE;
    return true;
  }
}

module.exports = RolUtil;
