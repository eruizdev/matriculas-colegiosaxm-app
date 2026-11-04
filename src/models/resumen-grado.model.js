class ResumenGrado {
  constructor({ gradoId, grado, nivel }) {
    this.gradoId = gradoId;
    this.grado = grado;
    this.nivel = nivel;
    this.total = 0;
    this.disponibles = 0;
    this.jornadas = [];
  }

  agregar(cupo) {
    this.total += cupo.total;
    this.disponibles += cupo.disponibles;
    this.jornadas.push({ jornada: cupo.jornada, estado: cupo.estado });
  }

  hayDisponibles() {
    return this.disponibles > 0;
  }
}

module.exports = ResumenGrado;
