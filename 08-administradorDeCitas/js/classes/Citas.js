import UI from './UI.js';
const ui = new UI();
class Citas {
  constructor() {
    this.citas = [];
  }

  // Agregar nueva cita al array

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  // Eliminar cita del array

  eliminarCitas(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
  }

  // Crear nuevo array con cita modificada

  editarCita(citaActualizada) {
    this.citas = this.citas.map(cita => (cita.id === citaActualizada.id ? (cita = citaActualizada) : cita));
    ui.agregarCitaHtml(this.citas);
  }
}

export default Citas;
