const mensajeContactoService = require('../../services/mensaje-contacto.service');

class ContactoController {
  index(req, res) {
    res.render('publico/contacto', { titulo: 'Contacto', datos: {} });
  }

  enviar(req, res) {
    mensajeContactoService.enviar(req.body);
    res.render('publico/contacto', {
      titulo: 'Contacto',
      datos: {},
      exito: 'Tu mensaje fue enviado, pronto te responderemos'
    });
  }
}

module.exports = new ContactoController();
