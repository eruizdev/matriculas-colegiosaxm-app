class ValidacionMiddleware {
  static validar(validador, vista, extras = {}) {
    return (req, res, next) => {
      const errores = validador(req.body);
      if (errores.length > 0) {
        return res.status(400).render(vista, { ...extras, errores, datos: req.body });
      }
      next();
    };
  }
}

module.exports = ValidacionMiddleware;
