class BaseRepository {
  constructor(Modelo) {
    this.Modelo = Modelo;
    this.registros = [];
    this.siguienteId = 1;
  }

  ordenar(registros) {
    return registros;
  }

  findAll() {
    return this.ordenar([...this.registros]);
  }

  findById(id) {
    return this.registros.find(r => r.id === Number(id));
  }

  findBy(condicion) {
    return this.findAll().filter(condicion);
  }

  findOneBy(condicion) {
    return this.registros.find(condicion);
  }

  count(condicion) {
    return condicion ? this.registros.filter(condicion).length : this.registros.length;
  }

  create(data) {
    const registro = new this.Modelo({ ...data, id: this.siguienteId++ });
    this.registros.push(registro);
    return registro;
  }

  update(id, data) {
    const registro = this.findById(id);
    if (!registro) return null;
    Object.assign(registro, data);
    return registro;
  }

  delete(id) {
    const index = this.registros.findIndex(r => r.id === Number(id));
    if (index === -1) return false;
    this.registros.splice(index, 1);
    return true;
  }
}

module.exports = BaseRepository;
