const { Router } = require('express');
const authController = require('../../controllers/auth/auth.controller');
const AuthMiddleware = require('../../middlewares/auth.middleware');
const ValidacionMiddleware = require('../../middlewares/validacion.middleware');
const AuthValidator = require('../../validators/auth.validator');

const router = Router();

router.get('/login', AuthMiddleware.soloInvitados, authController.mostrarLogin);
router.post(
  '/login',
  AuthMiddleware.soloInvitados,
  ValidacionMiddleware.validar(AuthValidator.validarLogin, 'auth/login', { titulo: 'Ingresar' }),
  authController.login
);

router.get('/registro', AuthMiddleware.soloInvitados, authController.mostrarRegistro);
router.post(
  '/registro',
  AuthMiddleware.soloInvitados,
  ValidacionMiddleware.validar(AuthValidator.validarRegistro, 'auth/registro', { titulo: 'Registro' }),
  authController.registro
);

router.get('/logout', authController.logout);

module.exports = router;
