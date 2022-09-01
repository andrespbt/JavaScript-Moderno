// Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const listaCitas = document.querySelector('#citas');
let editando;
// Clases

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

class UI {
   mostrarAlerta(mensaje, tipo) {
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
         btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
         btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

         // Crear boton para editar cita
         const btnEditar = document.createElement('button');
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

// Instancas de clases

const ui = new UI();
const administrarCitas = new Citas();

// Event listeners

eventListeners();

function eventListeners() {
   mascotaInput.addEventListener('input', datosCita);
   propietarioInput.addEventListener('input', datosCita);
   telefonoInput.addEventListener('input', datosCita);
   fechaInput.addEventListener('input', datosCita);
   horaInput.addEventListener('input', datosCita);
   sintomasInput.addEventListener('input', datosCita);
   formulario.addEventListener('submit', agregarCita);
}

// Objeto con los datos de la cita

const datosCliente = {
   mascota: '',
   propietario: '',
   telefono: '',
   fecha: '',
   hora: '',
   sintomas: '',
};

// Funciones

// Agregar datos de input al objeto datos cliente
function datosCita(e) {
   datosCliente[e.target.name] = e.target.value;
}

function agregarCita(e) {
   e.preventDefault();

   // Desestructurar objeto datos cliente
   const { mascota, propietario, telefono, fecha, hora, sintomas } = datosCliente;

   // Validar inputs
   if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
      ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
      return;
   }

   if (editando) {
      ui.mostrarAlerta('Editado correctamente');

      // Pasar el objeto de la cita a edicion
      administrarCitas.editarCita({ ...datosCliente });

      // Quitar modo edicion
      editando = false;

      // Actualizar texto del boton
      formulario.querySelector('button[type="submit"]').textContent = 'CREAR CITA';
   } else {
      // Agregar id a cita
      datosCliente.id = Date.now();

      // Agregar cita
      administrarCitas.agregarCita({ ...datosCliente });

      // Mostrar mensaje
      ui.mostrarAlerta('Se agrego correctamente');
   }

   // Reiniciar objeto
   reiniciarObjeto();

   // Resetear formulario
   formulario.reset();

   // Agregar cita al html
   ui.agregarCitaHtml(administrarCitas.citas);
}

function reiniciarObjeto() {
   datosCliente.mascota = '';
   datosCliente.propietario = '';
   datosCliente.telefono = '';
   datosCliente.fecha = '';
   datosCliente.hora = '';
   datosCliente.sintomas = '';
}

function eliminarCita(id) {
   // Eliminar cita
   administrarCitas.eliminarCitas(id);

   // Mostrar mensaje
   ui.mostrarAlerta('La cita se elimino correctamente');

   // Refrescar la cita
   ui.agregarCitaHtml(administrarCitas.citas);
}

// Cargar los datos

function cargarEdicion(cita) {
   const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

   // Llenar los inputs
   mascotaInput.value = mascota;
   propietarioInput.value = propietario;
   telefonoInput.value = telefono;
   fechaInput.value = fecha;
   horaInput.value = hora;
   sintomasInput.value = sintomas;

   // Llenar el objeto

   datosCliente.mascota = mascota;
   datosCliente.propietario = propietario;
   datosCliente.telefono = telefono;
   datosCliente.fecha = fecha;
   datosCliente.hora = hora;
   datosCliente.sintomas = sintomas;
   datosCliente.id = id;

   // Modificar boton para que diga modificar cita
   formulario.querySelector('button[type=submit]').textContent = 'Guardar cambios';

   // Modo edicion
   editando = true;
}
