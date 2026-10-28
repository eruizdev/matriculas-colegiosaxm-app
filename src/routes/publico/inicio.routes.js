const { Router } = require('express');
const inicioController = require('../../controllers/publico/inicio.controller');

const router = Router();

router.get('/', inicioController.index);

module.exports = router;
