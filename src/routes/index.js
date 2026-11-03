const { Router } = require('express');
const AuthMiddleware = require('../middlewares/auth.middleware');
const RolMiddleware = require('../middlewares/rol.middleware');
const { Permisos } = require('../constants/permisos');

const router = Router();

const puede = permiso => [AuthMiddleware.verificarSesion, RolMiddleware.requierePermiso(permiso)];

router.use('/', require('./publico/inicio.routes'));
router.use('/cupos', require('./publico/cupo.routes'));
router.use('/requisitos', require('./publico/requisito.routes'));
router.use('/noticias', require('./publico/noticia.routes'));
router.use('/contacto', require('./publico/contacto.routes'));

router.use('/auth', require('./auth/auth.routes'));

router.use('/padre/perfil', puede(Permisos.EDITAR_PERFIL), require('./padre/perfil.routes'));
router.use('/padre/cupos', puede(Permisos.VER_CUPOS_DETALLE), require('./padre/cupo.routes'));

router.use('/admin', puede(Permisos.VER_PANEL), require('./admin/dashboard.routes'));
router.use('/admin/usuarios', puede(Permisos.GESTIONAR_USUARIOS), require('./admin/usuario.routes'));
router.use('/admin/cupos', puede(Permisos.GESTIONAR_CUPOS), require('./admin/cupo.routes'));
router.use('/admin/grados', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/grado.routes'));
router.use('/admin/periodos', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/periodo-academico.routes'));
router.use('/admin/noticias', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/noticia.routes'));
router.use('/admin/requisitos', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/requisito.routes'));
router.use('/admin/colegio', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/colegio.routes'));
router.use('/admin/mensajes', puede(Permisos.GESTIONAR_CONTENIDO), require('./admin/mensaje-contacto.routes'));

module.exports = router;
