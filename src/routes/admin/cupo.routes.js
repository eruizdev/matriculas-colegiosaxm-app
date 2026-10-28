const { Router } = require('express');
const cupoController = require('../../controllers/admin/cupo.controller');

const router = Router();

router.get('/', cupoController.index);
router.post('/', cupoController.crear);
router.post('/:id/actualizar', cupoController.actualizar);
router.post('/:id/eliminar', cupoController.eliminar);

module.exports = router;
