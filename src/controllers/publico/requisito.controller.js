const requisitoService = require('../../services/requisito.service');

class RequisitoController {
  index(req, res) {
    const requisitos = requisitoService.listar();
    res.render('publico/requisitos', { titulo: 'Requisitos', requisitos });
  }
}

module.exports = new RequisitoController();
