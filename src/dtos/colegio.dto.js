class ColegioDto {
  static desde(colegio) {
    const datosContacto = [
      { etiqueta: 'Dirección', valor: colegio.direccion },
      { etiqueta: 'Teléfono', valor: colegio.telefono },
      { etiqueta: 'Correo', valor: colegio.correo },
      { etiqueta: 'Horario', valor: colegio.horario }
    ].filter(dato => dato.valor);

    return {
      nombre: colegio.nombre,
      direccion: colegio.direccion,
      telefono: colegio.telefono,
      correo: colegio.correo,
      horario: colegio.horario,
      tieneContacto: colegio.tieneContacto(),
      contactoCorto: [colegio.direccion, colegio.telefono, colegio.correo].filter(Boolean).join(' · '),
      datosContacto
    };
  }
}

module.exports = ColegioDto;
