import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {
   mascotaInput,
   propietarioInput,
   telefonoInput,
   fechaInput,
   horaInput,
   sintomasInput,
   formulario,
} from './selectores.js';
// Instancas de clases
export const ui = new UI();
export const administrarCitas = new Citas();

let editando;

// Objeto con los datos de la cita

const datosCliente = {
   mascota: '',
   propietario: '',
   telefono: '',
   fecha: '',
   hora: '',
   sintomas: '',
};

// Agregar datos de input al objeto datos cliente
export function datosCita(e) {
   datosCliente[e.target.name] = e.target.value;
}

export function agregarCita(e) {
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

export function reiniciarObjeto() {
   datosCliente.mascota = '';
   datosCliente.propietario = '';
   datosCliente.telefono = '';
   datosCliente.fecha = '';
   datosCliente.hora = '';
   datosCliente.sintomas = '';
}

export function eliminarCita(id) {
   // Eliminar cita
   administrarCitas.eliminarCitas(id);

   // Mostrar mensaje
   ui.mostrarAlerta('La cita se elimino correctamente');

   // Refrescar la cita
   ui.agregarCitaHtml(administrarCitas.citas);
}

// Cargar los datos

export function cargarEdicion(cita) {
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
