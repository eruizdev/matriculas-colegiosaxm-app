const { Router } = require('express');
const contactoController = require('../../controllers/publico/contacto.controller');
const ValidacionMiddleware = require('../../middlewares/validacion.middleware');
const ContactoValidator = require('../../validators/contacto.validator');

const router = Router();

router.get('/', contactoController.index);
router.post(
  '/',
  ValidacionMiddleware.validar(ContactoValidator.validar, 'publico/contacto', { titulo: 'Contacto' }),
  contactoController.enviar
);

module.exports = router;
