import { obtenerClienteId, actualizarCliente } from './API.js';
import { mostrarAlerta, esValido } from './funciones.js';

(function () {
  // Variables y selectores
  let nombreInput = document.querySelector('#nombre');
  let emailInput = document.querySelector('#email');
  let telefonoInput = document.querySelector('#telefono');
  let empresaInput = document.querySelector('#empresa');

  // Eventos
  document.addEventListener('DOMContentLoaded', async () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const clienteId = parametrosUrl.get('id');
    const cliente = await obtenerClienteId(clienteId);
    const formulario = document.querySelector('#formulario');
    llenarCampos(cliente);
    formulario.addEventListener('submit', e => {
      e.preventDefault();
      let clienteActualizado = {
        nombre: nombreInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
        empresa: empresaInput.value,
        id: parseInt(clienteId)
      };

      if (esValido(clienteActualizado)) {
        // Reescribe el objeto
        actualizarCliente(clienteActualizado);
      } else {
        mostrarAlerta('Todos los campos son obligatorios');
        return;
      }
    });
  });

  // Funciones
  function llenarCampos(cliente) {
    // Asignar datos guardados
    const { nombre, email, telefono, empresa } = cliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }
})();
