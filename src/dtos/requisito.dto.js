class RequisitoDto {
  static desde(requisito) {
    return {
      id: requisito.id,
      titulo: requisito.titulo,
      descripcion: requisito.descripcion,
      orden: requisito.orden,
      obligatorio: requisito.esObligatorio(),
      tipo: requisito.esObligatorio() ? 'Obligatorio' : 'Opcional'
    };
  }
}

module.exports = RequisitoDto;
