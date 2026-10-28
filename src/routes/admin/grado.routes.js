const { Router } = require('express');
const gradoController = require('../../controllers/admin/grado.controller');

const router = Router();

router.get('/', gradoController.index);
router.post('/', gradoController.crear);
router.post('/:id/estado', gradoController.cambiarEstado);
router.post('/:id/eliminar', gradoController.eliminar);

module.exports = router;
