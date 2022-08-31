// Variables
const contenidoPrincipal = document.querySelector('.contenido-principal');
const formulario = document.querySelector('#agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');
const reiniciarPresupuestobtn = document.querySelector('#btnPresupuesto');
reiniciarPresupuestobtn.onclick = () => {
   const respuesta = confirm('¿ Seguro que desea eliminar el presupuesto y crear uno nuevo ?');
   if (respuesta) {
      localStorage.clear();
      location.reload();
   }
};
let presupuestoPrompt;

// Clases

class Presupuesto {
   constructor(presupuesto, restante, gastos) {
      this.presupuesto = presupuesto;
      this.restante = restante ? restante : presupuesto;
      this.gastos = gastos || [];
   }

   nuevoGasto(gasto) {
      this.gastos = [...this.gastos, gasto];
      this.calcularRestante();
   }

   calcularRestante() {
      const gastado = this.gastos.reduce((total, gasto) => (total += Number(gasto.cantidad)), 0);
      this.restante = this.presupuesto - gastado;
   }

   eliminarGasto(id) {
      // Eliminar gastos del array
      this.gastos = this.gastos.filter(gasto => gasto.id != id);
      // Eliminar gastos del html
      ui.imprimirGastos(this.gastos);
      // Calcular restante
      this.calcularRestante();
      // Actualizar restante en el html
      ui.actualizarRestante(this.restante);
      // Comprueba el presupuesto en el html
      ui.comprobarPresupuesto(presupuestoPrompt);
      // Eliminar de local Storage
      localStorage.setItem('gastos', JSON.stringify(this.gastos));
   }
}

class UI {
   // Agregar primer html para preguntar presupuesto evitando asi el prompt
   preguntarPresupuesto() {
      const contenidoPrincipal = document.querySelector('.contenido-principal');
      const h1 = document.querySelector('.text-center');
      const section = document.createElement('section');
      contenidoPrincipal.classList.add('hidden');
      h1.textContent = 'Ingresar presupuesto';
      section.classList.add('contenido-principal', 'mx-5', 'text-center', 'sectionPresupuesto');
      section.innerHTML = `
    <div class="row" >
                 <div class="col ">
                     <div class="contenido primario">
                             <form id="agregarPresupuesto" action="#">
                                 <div class="form-group" style = "display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                     <label for="gasto" style = "font-size: 2rem; margin-bottom:30px;">Presupuesto total:</label>
                                     <input type="text" style = "width: 400px" class="form-control" id="presupuestoTotal" placeholder="Añadir presupuesto">
                                 </div>
                                 <button type="submit" id="presupuestoBtn" class="btn btn-primary" style = "width: 400px">Agregar</button>
                             </form>
 
                     </div> <!--.contenido-->
                 </div>
                 `;
      document.body.appendChild(section);

      document.querySelector('#agregarPresupuesto').addEventListener('submit', ui.validarPresupuesto);
   }

   // Validando que el presupuesto ingresado sea correcto

   validarPresupuesto(e) {
      e.preventDefault();
      // Instanciamos un presupuesto y lo asignamos a la variable global
      presupuestoPrompt = new Presupuesto(Number(document.querySelector('#presupuestoTotal').value));
      // Ingresamos el presupuesto para insertarlo en la UI
      ui.insertarPresupuesto(presupuestoPrompt);
      // Seleccionamos los elementos para modifiar las clases
      const sectionPrincipal = document.querySelector('.contenido-principal');
      const sectionPresupuesto = document.querySelector('.sectionPresupuesto');
      const h1 = document.querySelector('.text-center');

      // Si el presupuesto es valido se elimina el html presupuesto y se muestra el html para controlar gastos
      if (sectionPrincipal.classList.contains('hidden')) {
         if (presupuestoPrompt.presupuesto <= 0 || isNaN(presupuestoPrompt.presupuesto)) {
            location.reload();
            return;
         }
         sectionPresupuesto.classList.remove('contenido-principal');
         sectionPresupuesto.classList.add('hidden');
         sectionPrincipal.classList.remove('hidden');
         h1.textContent = 'Añade tus gastos aqui';
         // Agregamos el presupuesto a local storage
         localStorage.setItem('presupuesto', JSON.stringify(presupuestoPrompt.presupuesto));

         // Habilitamos el boton para reiniciar el presupuesto
         reiniciarPresupuestobtn.classList.remove('hidden');
         reiniciarPresupuestobtn.classList.add('nuevoPresupuesto');
      }
   }

   // Insertar el presupuesto
   insertarPresupuesto(cantidad) {
      // Desestructurar el objeto cantidad
      const { presupuesto, restante } = cantidad;
      // Asignar variables
      document.querySelector('#total').textContent = presupuesto;
      document.querySelector('#restante').textContent = restante;
   }

   mostrarMensaje(mensaje, tipo) {
      // Crear el div
      const div = document.createElement('div');
      div.classList.add('alert', 'text-center');
      if (tipo === 'error') {
         div.classList.add('alert-danger');
      } else {
         div.classList.add('alert-success');
      }
      // Agregar el mensaje
      div.textContent = mensaje;

      // Insertar en el html
      document.querySelector('.primario').insertBefore(div, formulario);
      // Eliminar mensaje dsp de 2 segundos
      setTimeout(() => {
         div.remove();
      }, 2000);
   }

   // Imprimir gastos en pantalla
   imprimirGastos(gastos) {
      // Limpiar el html antes de agregar los gastos
      this.limpiarHtml();
      gastos.forEach(gasto => {
         const { nombre, cantidad, id } = gasto;

         // Crear li
         const nuevoGasto = document.createElement('li');
         nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
         // Agregar atributo data-id
         nuevoGasto.dataset.id = id;

         // Agregar el html del gasto
         nuevoGasto.innerHTML = `${nombre} <span class= "badge badge-primary badge-pill">$${cantidad}</span>`;

         // Boton para borrar gastos
         const btnBorrar = document.createElement('button');
         btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
         btnBorrar.innerHTML = 'Borrar &times';
         btnBorrar.onclick = () => {
            eliminarGasto(id);
         };
         nuevoGasto.appendChild(btnBorrar);
         // Agregar gasto
         gastosListado.appendChild(nuevoGasto);
      });
   }

   // Elimina el html previo

   limpiarHtml() {
      while (gastosListado.firstChild) {
         gastosListado.removeChild(gastosListado.firstChild);
      }
   }

   actualizarRestante(restante) {
      document.querySelector('#restante').textContent = restante;
      localStorage.setItem('restante', presupuestoPrompt.restante.toString());
   }

   comprobarPresupuesto(presupuestoObj) {
      const { presupuesto, restante } = presupuestoObj;
      const restanteDiv = document.querySelector('.restante');
      // Comprobar 25%
      if (presupuesto / 4 > restante) {
         restanteDiv.classList.remove('alert-success', 'alert-warning');
         restanteDiv.classList.add('alert-danger');
      }
      // Comprobar 50%
      else if (presupuesto / 2 > restante) {
         restanteDiv.classList.remove('alert-success', 'alert-danger');
         restanteDiv.classList.add('alert-warning');
      } else {
         restanteDiv.classList.remove('alert-danger', 'alert-warning');
         restanteDiv.classList.add('alert-success');
      }

      // Desabilitar boton si el total es menor o igual a 0
      if (restante <= 0) {
         ui.mostrarMensaje('El presupuesto se ha agotado', 'error');
         formulario.querySelector('button[type="submit"]').disabled = true;
      }
   }
}

// Instanciar

const ui = new UI();

// Eventos

eventListener();
function eventListener() {
   window.addEventListener('load', () => {
      if (!localStorage.getItem('presupuesto')) {
         reiniciarPresupuestobtn.classList.add('hidden');
         reiniciarPresupuestobtn.classList.remove('nuevoPresupuesto');
         ui.preguntarPresupuesto();
      } else {
         presupuestoPrompt = new Presupuesto(JSON.parse(localStorage.getItem('presupuesto')));
         if (JSON.parse(localStorage.getItem('restante')) != null) {
            presupuestoPrompt.restante = JSON.parse(localStorage.getItem('restante'));
         } else {
            presupuestoPrompt.restante = presupuestoPrompt.presupuesto;
         }
         presupuestoPrompt.gastos = JSON.parse(localStorage.getItem('gastos'));

         ui.insertarPresupuesto(presupuestoPrompt);
         if (presupuestoPrompt.gastos) {
            ui.imprimirGastos(presupuestoPrompt.gastos);
         }

         ui.comprobarPresupuesto(presupuestoPrompt);

         reiniciarPresupuestobtn.classList.remove('hidden');
         reiniciarPresupuestobtn.classList.add('nuevoPresupuesto');
      }
   });
   formulario.addEventListener('submit', agregarGasto);
}

// Funciones

function agregarGasto(e) {
   e.preventDefault();
   // Leer datos del formulario
   const nombre = document.querySelector('#gasto').value;
   const cantidad = document.querySelector('#cantidad').value;

   // Validar los campos y mostrar mensajes correspondientes
   if (nombre === '' || cantidad === '') {
      ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
      return;
   } else if (cantidad <= 0 || isNaN(cantidad)) {
      ui.mostrarMensaje('Cantidad no valida', 'error');
      return;
   }

   // Generar un objeto con el gasto
   const gasto = { nombre, cantidad, id: Date.now() };
   presupuestoPrompt.nuevoGasto(gasto);
   // Imprimir alerta
   ui.mostrarMensaje('Gasto agregado correctamente');
   // Imprimir los gastos
   const { gastos, restante } = presupuestoPrompt;
   ui.imprimirGastos(gastos);
   // Actualizar restante
   ui.actualizarRestante(restante);
   ui.comprobarPresupuesto(presupuestoPrompt);
   localStorage.setItem('gastos', JSON.stringify(gastos));
   // Reiniciar formulario
   formulario.reset();
}

function eliminarGasto(id) {
   presupuestoPrompt.eliminarGasto(id);
}
