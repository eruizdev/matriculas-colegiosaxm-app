class FechaUtil {
  static formatear(fecha) {
    if (!fecha) return '';
    const soloDia = typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha);
    return new Date(soloDia ? `${fecha}T00:00:00` : fecha).toLocaleDateString('es-CO', {
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
