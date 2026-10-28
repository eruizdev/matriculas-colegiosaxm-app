const { Router } = require('express');
const cupoController = require('../../controllers/padre/cupo.controller');

const router = Router();

router.get('/', cupoController.index);

module.exports = router;
