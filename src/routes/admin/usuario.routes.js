const { Router } = require('express');
const usuarioController = require('../../controllers/admin/usuario.controller');

const router = Router();

router.get('/', usuarioController.index);
router.post('/', usuarioController.crearAdmin);
router.post('/:id/estado', usuarioController.cambiarEstado);
router.post('/:id/rol', usuarioController.cambiarRol);

module.exports = router;
