const { Router } = require('express');
const usuarioController = require('../../controllers/admin/usuario.controller');

const router = Router();

router.get('/', usuarioController.index);
router.post('/:id/estado', usuarioController.cambiarEstado);

module.exports = router;
