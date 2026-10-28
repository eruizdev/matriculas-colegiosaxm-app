const { Router } = require('express');
const requisitoController = require('../../controllers/publico/requisito.controller');

const router = Router();

router.get('/', requisitoController.index);

module.exports = router;
