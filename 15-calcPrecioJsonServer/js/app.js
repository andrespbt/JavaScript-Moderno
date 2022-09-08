// Selectores y variables
const guardarClienteBtn = document.querySelector('#guardar-cliente');
const contenido = document.querySelector('#resumen .contenido');
let platillosObj;

let datosCliente = {
  mesa: '',
  hora: '',
  pedido: []
};

const categorias = {
  1: 'Comida',
  2: 'Bebidas',
  3: 'Postres'
};

// Eventos

guardarClienteBtn.addEventListener('click', guardarCliente);

// Funciones

function guardarCliente() {
  const mesa = document.querySelector('#mesa').value;
  const hora = document.querySelector('#hora').value;
  const datosVacios = [mesa, hora].some(dato => dato === '');

  if (datosVacios) {
    mostrarAlerta('Todos los campos son obligatorios');
    return;
  }

  // Asignar datos del pedido al cliente
  datosCliente = { ...datosCliente, mesa, hora };

  // Ocultar modal
  const formularioModal = document.querySelector('#formulario');
  const modalBootstrap = bootstrap.Modal.getInstance(formularioModal);
  modalBootstrap.hide();

  // Mostrar secciones
  mostrarSecciones();

  // Obtener platillos de la api de json-server
  obtenerPlatillos();
}

function mostrarAlerta(mensaje) {
  const hayError = document.querySelector('.invalid-feedback');

  // Verificar que no haya mensajes
  if (!hayError) {
    const alerta = document.createElement('div');
    alerta.className = 'invalid-feedback d-block text-center';
    alerta.textContent = mensaje;
    document.querySelector('.modal-body').appendChild(alerta);

    // Eliminar alerta a los 3 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll('.d-none');

  seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos() {
  const url = 'http://localhost:4000/platillos';

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarPlatillos(resultado))
    .catch(err => console.log(err));
}

function mostrarPlatillos(platillos) {
  platillosObj = platillos;
  const contenido = document.querySelector('#platillos .contenido');

  platillos.forEach(platillo => {
    const row = document.createElement('div');
    row.classList.add('row', 'py-3', 'border-top');
    const { categoria, nombre, id, precio } = platillo;
    row.innerHTML += `
    <div class="col-md-4">${nombre}</div>
    <div class = "col-md-3 fw-bold">$${precio}</div>
    <div class = "col-md-3">${categorias[categoria]}</div>
    <div class = "col-md-2"><input class="form-control" type="number" min="0" id = "producto-${id}" value = "0" onchange="agregarPlatillo(${id}, value)"></input> </div>
    `;

    contenido.appendChild(row);
  });
}

// Funcion que detecta que platillo y la cantidad que se esta agregando

function agregarPlatillo(id, value) {
  // Obtener el platillo objetivo y sus propiedades + cantidad
  const platillo = platillosObj.filter(plato => plato.id === id).at(0);
  const cantidad = parseInt(value);
  platillo.cantidad = cantidad;

  // Extraer pedido
  let { pedido } = datosCliente;

  // Revisar que la cantidad sea mayor a 0
  if (cantidad > 0) {
    // Comprueba si el elemento ya existe en el array
    if (datosCliente.pedido.some(articulo => articulo.id === platillo.id)) {
      // Actualizar cantidad si ya existe
      const pedidoActualizado = pedido.map(articulo => {
        if (articulo.id === platillo.id) {
          articulo.cantidad = cantidad;
        }
        return articulo;
      });

      // Se asigna la nueva cantidad a datosCliente.pedido
      datosCliente.pedido = pedidoActualizado;
    } else {
      // Si no existe lo agregamos al array pedidos
      datosCliente.pedido = [...pedido, platillo];
    }
  } else {
    datosCliente.pedido = pedido.filter(articulo => articulo.id !== id);
  }

  // Limpiar el codigo html pedido
  limpiarHtml();

  if (datosCliente.pedido.length) {
    // Mostrar el resumen
    actualizarResumen();
  } else {
    mensajePedidoVacio();
  }
}

function actualizarResumen() {
  const { mesa, hora, pedido } = datosCliente;
  const resumen = document.createElement('div');
  resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');
  const listaPedido = document.createElement('ul');
  listaPedido.classList.add('list-group');

  // Agregar informacion al div conenido
  resumen.innerHTML = `
  <h3 class= "my-4 text-center" >Platillos consumidos </h3>
  <p class= "fw-bold" >Mesa: <span class = "fw-normal"> ${mesa} </span> </p>
  <p class= "fw-bold" >Hora: <span class = "fw-normal"> ${hora} </span> </p>
  `;

  // Iterar sobre el array de pedidos
  pedido.forEach(articulo => {
    const { nombre, cantidad, precio, id } = articulo;

    listaPedido.innerHTML += `
    <li class="list-group-item">
    <h4 class= "my-4">${nombre}</h4>
    <p class="fw-bold">Cantidad: 
    <span class="fw-normal">${cantidad}</span>
    <p class="fw-bold">Precio: 
    <span class="fw-normal">$${precio}</span>
    </p>
    <p class="fw-bold">Subtotal: 
    <span class="fw-normal">${calcularSubtotal(precio, cantidad)}</span> 
    </p>
    <button class="btn btn-danger" onclick="eliminarProducto(${id})" >Eliminar del pedido</button>
    </li>
    `;

    resumen.appendChild(listaPedido);
  });

  contenido.appendChild(resumen);

  // Mostrar formulario de propinas
  formularioPropinas();
}

function limpiarHtml() {
  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

// Calcular subtotal del articulo a agregar

function calcularSubtotal(precio, cantidad) {
  return `$${precio * cantidad}`;
}

function eliminarProducto(id) {
  const { pedido } = datosCliente;
  const resultado = pedido.filter(articulo => articulo.id !== id);
  datosCliente.pedido = [...resultado];

  limpiarHtml();

  if (datosCliente.pedido.length) {
    // Mostrar el resumen
    actualizarResumen();
  } else {
    mensajePedidoVacio();
  }

  // El producto se elimino , se regresa la cant a 0 en el formulario
  const productoEliminado = document.querySelector(`#producto-${id}`);
  productoEliminado.value = 0;
}

function mensajePedidoVacio() {
  const contenido = document.querySelector('#resumen .contenido');
  contenido.innerHTML = `
  <p class="text-center">Añade los elementos del pedido</p>
  `;
}

function formularioPropinas() {
  const contenido = document.querySelector('#resumen .contenido');
  const formulario = document.createElement('div');
  formulario.classList.add('col-md-6', 'formulario');

  formulario.innerHTML = `
  <div class="card py-2 px-3 shadow'">
    <h3 class="my-4 text-center">Propina</h3>
    <div class="form-check">
    <label class="form-check-label" >10%</label>
    <input class="form-check-input" onclick="calcularPropina(value)" type="radio" name="propina" value="10"></input>
    </div>
    <div class="form-check">
    <label class="form-check-label" >25%</label>
    <input class="form-check-input" onclick="calcularPropina(value)" type="radio" name="propina" value="25"></input>
    </div>
    <div class="form-check">
    <label class="form-check-label" >50%</label>
    <input class="form-check-input" onclick="calcularPropina(value)" type="radio" name="propina" value="50"></input>
    </div>
  </div>
  `;

  contenido.appendChild(formulario);
}

function calcularPropina(porcentaje) {
  const { pedido } = datosCliente;
  let subTotal = 0;

  pedido.forEach(articulo => {
    const { precio, cantidad } = articulo;

    subTotal += precio * cantidad;
  });
  const propina = subTotal * (porcentaje / 100);
  const total = subTotal + subTotal * (porcentaje / 100);

  mostrarTotalHtml(subTotal, total, propina);
}

function mostrarTotalHtml(subTotal, total, propina) {
  const formDiv = document.querySelector('.formulario > div');
  // Contenedor
  const divContainer = document.createElement('div');
  divContainer.classList.add('total-pagar', 'my-5');

  // Subtotal
  const subTotalParrafo = document.createElement('p');
  subTotalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
  subTotalParrafo.textContent = 'Subtotal consumo: ';

  const subTotalSpan = document.createElement('span');
  subTotalSpan.classList.add('fw-normal');
  subTotalSpan.textContent = `$${subTotal}`;

  subTotalParrafo.appendChild(subTotalSpan);

  // Propina
  const propinaParrafo = document.createElement('p');
  propinaParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
  propinaParrafo.textContent = 'Propina: ';

  const propinaSpan = document.createElement('span');
  propinaSpan.classList.add('fw-normal');
  propinaSpan.textContent = `$${propina}`;

  propinaParrafo.appendChild(propinaSpan);

  // Total
  const totalParrafo = document.createElement('p');
  totalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
  totalParrafo.textContent = 'Total a pagar: ';

  const totalSpan = document.createElement('span');
  totalSpan.classList.add('fw-normal');
  totalSpan.textContent = `$${total}`;

  totalParrafo.appendChild(totalSpan);

  // Eliminar el ultimo resultado
  const totalPagarDiv = document.querySelector('.total-pagar');
  if (totalPagarDiv) {
    totalPagarDiv.remove();
  }

  // Agregar contenido a container

  divContainer.appendChild(subTotalParrafo);
  divContainer.appendChild(propinaParrafo);
  divContainer.appendChild(totalParrafo);

  // Agregar contenido al div en el html

  formDiv.appendChild(divContainer);
}
