const express = require('express');
const session = require('express-session');
const path = require('path');
const Session = require('./config/session');
const routes = require('./routes');
const ErrorMiddleware = require('./middlewares/error.middleware');

class App {
  constructor() {
    this.app = express();
    this.configurar();
    this.rutas();
    this.errores();
  }

  configurar() {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '..', 'public')));
    this.app.use(session(Session.getOptions()));
    this.app.use((req, res, next) => {
      res.locals.usuario = req.session.usuario || null;
      next();
    });
  }

  rutas() {
    this.app.use('/', routes);
  }

  errores() {
    this.app.use(ErrorMiddleware.noEncontrado);
    this.app.use(ErrorMiddleware.manejar);
  }
}

module.exports = new App().app;
