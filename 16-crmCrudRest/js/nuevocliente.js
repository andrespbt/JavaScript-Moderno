import { mostrarAlerta, esValido } from './funciones.js';
import { nuevoCliente } from './API.js';
(function () {
  // Variables y Selectores
  const formulario = document.querySelector('#formulario');

  // Eventos
  formulario.addEventListener('submit', validarFormulario);

  // Funciones
  function validarFormulario(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    // Objeto cliente con datos de los inputs

    const cliente = {
      nombre,
      email,
      telefono,
      empresa
    };

    if (!esValido(cliente)) {
      mostrarAlerta('Todos los campos son obligatorios');
      return;
    }

    nuevoCliente(cliente);
  }
})();
