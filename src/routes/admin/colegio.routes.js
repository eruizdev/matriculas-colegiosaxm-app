const { Router } = require('express');
const colegioController = require('../../controllers/admin/colegio.controller');

const router = Router();

router.get('/', colegioController.index);
router.post('/', colegioController.actualizar);

module.exports = router;
