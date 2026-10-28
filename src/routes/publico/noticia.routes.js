const { Router } = require('express');
const noticiaController = require('../../controllers/publico/noticia.controller');

const router = Router();

router.get('/', noticiaController.index);
router.get('/:id', noticiaController.detalle);

module.exports = router;
