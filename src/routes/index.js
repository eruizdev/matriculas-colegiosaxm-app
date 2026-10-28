const { Router } = require('express');
const AuthMiddleware = require('../middlewares/auth.middleware');
const RolMiddleware = require('../middlewares/rol.middleware');
const Roles = require('../constants/roles');

const router = Router();

const soloPadres = [AuthMiddleware.verificarSesion, RolMiddleware.permitir(Roles.PADRE)];
const soloAdmin = [AuthMiddleware.verificarSesion, RolMiddleware.permitir(Roles.ADMIN)];

router.use('/', require('./publico/inicio.routes'));
router.use('/cupos', require('./publico/cupo.routes'));
router.use('/requisitos', require('./publico/requisito.routes'));
router.use('/noticias', require('./publico/noticia.routes'));
router.use('/contacto', require('./publico/contacto.routes'));

router.use('/auth', require('./auth/auth.routes'));

router.use('/padre/perfil', soloPadres, require('./padre/perfil.routes'));
router.use('/padre/cupos', soloPadres, require('./padre/cupo.routes'));

router.use('/admin', soloAdmin, require('./admin/dashboard.routes'));
router.use('/admin/usuarios', soloAdmin, require('./admin/usuario.routes'));
router.use('/admin/grados', soloAdmin, require('./admin/grado.routes'));
router.use('/admin/cupos', soloAdmin, require('./admin/cupo.routes'));
router.use('/admin/periodos', soloAdmin, require('./admin/periodo-academico.routes'));
router.use('/admin/noticias', soloAdmin, require('./admin/noticia.routes'));
router.use('/admin/requisitos', soloAdmin, require('./admin/requisito.routes'));
router.use('/admin/mensajes', soloAdmin, require('./admin/mensaje-contacto.routes'));

module.exports = router;
