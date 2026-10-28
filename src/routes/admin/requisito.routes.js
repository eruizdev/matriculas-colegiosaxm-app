const { Router } = require('express');
const requisitoController = require('../../controllers/admin/requisito.controller');

const router = Router();

router.get('/', requisitoController.index);
router.post('/', requisitoController.crear);
router.post('/:id/eliminar', requisitoController.eliminar);

module.exports = router;
