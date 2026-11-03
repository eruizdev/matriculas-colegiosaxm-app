class TotalesCupoDto {
  static desde(cupos) {
    const total = cupos.reduce((suma, c) => suma + c.total, 0);
    const ocupados = cupos.reduce((suma, c) => suma + c.ocupados, 0);

    return {
      total,
      ocupados,
      disponibles: Math.max(total - ocupados, 0),
      porcentaje: total === 0 ? 0 : Math.round((ocupados / total) * 100)
    };
  }
}

module.exports = TotalesCupoDto;
