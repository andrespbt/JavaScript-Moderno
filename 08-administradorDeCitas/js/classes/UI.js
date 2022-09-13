import { eliminarCita, cargarEdicion } from '../funciones.js';
import { listaCitas } from '../selectores.js';
class UI {
  mostrarAlerta(mensaje, tipo) {
    const alertaPrevia = document.querySelector('.alert');

    // Solo se muestra 1 alerta a la vez
    if (alertaPrevia) {
      alertaPrevia.remove();
    }
    // Crear div
    const divMensaje = document.createElement('div');
    divMensaje.className = 'text-center alert d-block col-12';
    divMensaje.textContent = mensaje;

    // Agregar clase

    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }

    // Agregar data-cy
    divMensaje.dataset.cy = 'alerta';

    // Insertar en el html
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    // Eliminar mensaje despues de 3 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarCitaHtml(citas) {
    const contenedorCitas = document.createDocumentFragment();

    citas.forEach(cita => {
      // Desestructurar cita
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
      // Crear div contenedor
      const divCitas = document.createElement('div');

      // Crear boton para eliminar cita
      const btnEliminar = document.createElement('button');
      btnEliminar.dataset.cy = 'btn-eliminar';
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

      // Crear boton para editar cita
      const btnEditar = document.createElement('button');
      // Data set de cypress
      btnEditar.dataset.cy = 'btn-editar';
      btnEditar.classList.add('btn', 'btn-info');
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>`;

      // Agregar data set
      divCitas.classList.add('cita', 'p-3');
      divCitas.dataset.id = id;

      // Inner html del div , no agregamos boton por el evento
      divCitas.innerHTML = `<h2 class = "card-title font-weight-folder">${mascota}</h2>
          <p><span class = "font-weight-bolder">Propietario: </span>${propietario}</p>
          <p><span class = "font-weight-bolder">Telefono: </span>${telefono}</p>
          <p><span class = "font-weight-bolder">Fecha: </span>${fecha}</p>
          <p><span class = "font-weight-bolder">Hora: </span>${hora}</p>
          <p><span class = "font-weight-bolder">Sintomas: </span>${sintomas}</p>`;

      // Agregar evento boton eliminar y boton editar
      btnEliminar.onclick = () => eliminarCita(id);
      btnEditar.onclick = () => cargarEdicion(cita);
      divCitas.appendChild(btnEliminar);
      divCitas.appendChild(btnEditar);
      contenedorCitas.appendChild(divCitas);
    });

    this.limpiarHtml();

    listaCitas.appendChild(contenedorCitas);
  }

  limpiarHtml() {
    while (listaCitas.firstChild) {
      listaCitas.removeChild(listaCitas.firstChild);
    }
  }
}

export default UI;
