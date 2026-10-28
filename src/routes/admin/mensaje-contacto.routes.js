const { Router } = require('express');
const mensajeController = require('../../controllers/admin/mensaje-contacto.controller');

const router = Router();

router.get('/', mensajeController.index);
router.post('/:id/leido', mensajeController.marcarLeido);
router.post('/:id/eliminar', mensajeController.eliminar);

module.exports = router;
