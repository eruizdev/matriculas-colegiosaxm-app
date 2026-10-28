class FechaUtil {
  static formatear(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static anioActual() {
    return new Date().getFullYear();
  }
}

module.exports = FechaUtil;
