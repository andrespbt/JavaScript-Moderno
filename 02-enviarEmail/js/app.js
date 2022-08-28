// Variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const re =
   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const spinner = document.querySelector('#spinner');

// Agregar eventos

agregarEventos();

function agregarEventos() {
   // Inicializar app
   document.addEventListener('DOMContentLoaded', inicializarApp);

   // Validar inputs
   email.addEventListener('blur', validarInput);
   asunto.addEventListener('blur', validarInput);
   mensaje.addEventListener('blur', validarInput);

   // Enviar formulario
   enviarBtn.addEventListener('click', enviarFormulario);

   // Resetear formulario
   resetBtn.addEventListener('click', e => {
      e.preventDefault();
      inicializarApp();
   });
}

// Inicializando la app

function inicializarApp() {
   email.classList.remove('border-green-500');
   asunto.classList.remove('border-green-500');
   mensaje.classList.remove('border-green-500');
   formulario.reset();
   enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
   enviarBtn.disabled = true;
}

// Valiando inputs

function validarInput(e) {
   // Validar que el string no este vacio
   validarLength(e);
   // Validar email
   validarEmail(e);
   // Validar inputs y habilitar boton enviar
   habilitarBoton();
}

// Generar error y mostrarlo en el html
function mostrarError(mensaje) {
   const mensajeError = document.createElement('p');
   mensajeError.textContent = mensaje;
   mensajeError.classList.add(
      'border',
      'border-red-500',
      'background-red-100',
      'text-red-500',
      'p-3',
      'mt-5',
      'text-center',
      'error'
   );
   const errores = document.querySelectorAll('.error');

   // Validad que el mensaje de error no se repita
   if (errores.length === 0) {
      formulario.appendChild(mensajeError);
   }
}

// Validar que los input no esten vacios
function validarLength(e) {
   let inputUser = e.target.value;
   if (inputUser.length > 0) {
      e.target.classList.remove('border-red-500');
      e.target.classList.add('border-green-500');
      const error = document.querySelector('p.error');
      if (error) {
         error.remove();
      }
   } else {
      if (e.target.classList.contains('border-green-500')) {
         e.target.classList.remove('border-green-500');
      }
      e.target.classList.add('border', 'border-red-500');
      mostrarError('Todos los campos son obligatorios');
   }
}

// Validar input email
function validarEmail(e) {
   if (e.target.type === 'email') {
      if (re.test(e.target.value)) {
         if (e.target.classList.contains('border-red-500')) {
            e.target.classList.remove('border-red-500');
         }
      } else {
         if (e.target.classList.contains('border-green-500')) {
            e.target.classList.remove('border-green-500');
         }
         e.target.classList.add('border', 'border-red-500');
         mostrarError('Email no valido');
      }
   }
}

// Validar inputs y habilitar boton

function habilitarBoton() {
   if (re.test(email.value) && asunto.value.length > 0 && mensaje.value.length > 0) {
      enviarBtn.disabled = false;
      enviarBtn.classList.remove('cursor-not-allowed', 'opacity-50');
   }
}

// Enviar formulario

function enviarFormulario(e) {
   e.preventDefault();
   spinner.style.display = 'flex';

   setTimeout(() => {
      spinner.style.display = 'none';

      // Agregar mensaje
      const mensajeEnviado = document.createElement('p');
      mensajeEnviado.textContent = 'Mensaje enviado correctamente';
      mensajeEnviado.classList.add(
         'border-green-500',
         'bg-green-500',
         'p-3',
         'text-center',
         'my-10',
         'text-white',
         'font-bold'
      );
      formulario.insertBefore(mensajeEnviado, spinner);
      setTimeout(() => {
         mensajeEnviado.remove();
         inicializarApp();
      }, 5000);
   }, 3000);
}
