const Roles = require('./roles');

const Permisos = Object.freeze({
  VER_PANEL: 'ver_panel',
  GESTIONAR_CUPOS: 'gestionar_cupos',
  GESTIONAR_CONTENIDO: 'gestionar_contenido',
  GESTIONAR_USUARIOS: 'gestionar_usuarios',
  VER_CUPOS_DETALLE: 'ver_cupos_detalle',
  EDITAR_PERFIL: 'editar_perfil'
});

const PermisosPorRol = Object.freeze({
  [Roles.ADMIN]: [
    Permisos.VER_PANEL,
    Permisos.GESTIONAR_CUPOS,
    Permisos.GESTIONAR_CONTENIDO,
    Permisos.GESTIONAR_USUARIOS,
    Permisos.VER_CUPOS_DETALLE
  ],
  [Roles.PADRE]: [
    Permisos.VER_CUPOS_DETALLE,
    Permisos.EDITAR_PERFIL
  ]
});

module.exports = { Permisos, PermisosPorRol };
