const { Router } = require('express');
const noticiaController = require('../../controllers/admin/noticia.controller');

const router = Router();

router.get('/', noticiaController.index);
router.post('/', noticiaController.crear);
router.post('/:id/estado', noticiaController.cambiarEstado);
router.post('/:id/eliminar', noticiaController.eliminar);

module.exports = router;
