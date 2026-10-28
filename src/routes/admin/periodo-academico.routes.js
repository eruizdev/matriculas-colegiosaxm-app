const { Router } = require('express');
const periodoController = require('../../controllers/admin/periodo-academico.controller');

const router = Router();

router.get('/', periodoController.index);
router.post('/', periodoController.crear);
router.post('/:id/activar', periodoController.activar);
router.post('/:id/eliminar', periodoController.eliminar);

module.exports = router;
