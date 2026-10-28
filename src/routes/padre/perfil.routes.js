const { Router } = require('express');
const perfilController = require('../../controllers/padre/perfil.controller');

const router = Router();

router.get('/', perfilController.index);
router.post('/', perfilController.actualizar);

module.exports = router;
