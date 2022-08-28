// Variables Select
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Variables
const contenedorResultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10; // Año maximo de antiguedad 10

// Objeto con datos de filtro

const datosBusqueda = {
   marca: '',
   year: '',
   minimo: '',
   maximo: '',
   puertas: '',
   transmision: '',
   color: '',
};

// Eventos
document.addEventListener('DOMContentLoaded', () => {
   mostrarAutos(autos); // Carga los autos

   llenarSelectYear(); // Llena el select años
});

// Eventos de los campos select

marca.addEventListener('change', e => {
   datosBusqueda.marca = e.target.value;
   filtrarAuto();
});
year.addEventListener('change', e => {
   datosBusqueda.year = parseInt(e.target.value);
   filtrarAuto();
});
minimo.addEventListener('change', e => {
   datosBusqueda.minimo = parseInt(e.target.value);

   filtrarAuto();
});
maximo.addEventListener('change', e => {
   datosBusqueda.maximo = parseInt(e.target.value);
   filtrarAuto();
});
puertas.addEventListener('change', e => {
   datosBusqueda.puertas = parseInt(e.target.value);
   filtrarAuto();
});
transmision.addEventListener('change', e => {
   datosBusqueda.transmision = e.target.value;
   filtrarAuto();
});
color.addEventListener('change', e => {
   datosBusqueda.color = e.target.value;
   filtrarAuto();
});

// Funciones

function mostrarAutos(autos) {
   // Limpiar html
   limpiarHtml();
   autos.forEach(auto => {
      // Crear elemento html
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;
      const parrafo = document.createElement('p');

      // Agregar info
      parrafo.innerHTML = `${marca} - ${modelo} - ${year} - ${puertas} puertas - ${color} - ${transmision} - precio: ${precio}$`;

      // Agregarlo al contenedor
      contenedorResultado.appendChild(parrafo);
   });
}

// Limpiar el html
function limpiarHtml() {
   while (contenedorResultado.children.length > 0) {
      contenedorResultado.removeChild(contenedorResultado.lastChild);
   }
}

// Llenar el select de año

function llenarSelectYear() {
   for (let i = max; i >= min; i--) {
      const opcion = document.createElement('option');
      opcion.value = i;
      opcion.textContent = i;
      year.appendChild(opcion); // Agregar opciones de año al select
   }
}

// Filtrar auto segun datos elegidos por el usuario

function filtrarAuto() {
   const resultado = autos
      .filter(filtrarMarca)
      .filter(filtrarYear)
      .filter(filtrarMinimo)
      .filter(filtrarMaximo)
      .filter(filtrarPuertas)
      .filter(filtrarTransmision)
      .filter(filtrarColor);

   if (resultado.length > 0) {
      mostrarAutos(resultado);
   } else {
      sinResultado();
   }
}

// Filtra por marca

function filtrarMarca(auto) {
   if (datosBusqueda.marca) {
      return auto.marca === datosBusqueda.marca;
   }
   return auto;
}

// Filtra por año

function filtrarYear(auto) {
   if (datosBusqueda.year) {
      return auto.year === parseInt(datosBusqueda.year);
   }
   return auto;
}
// Filtra por precio minimo

function filtrarMinimo(auto) {
   if (datosBusqueda.minimo) {
      return auto.precio >= datosBusqueda.minimo;
   }
   return auto;
}
// Filtra por precio maximo

function filtrarMaximo(auto) {
   if (datosBusqueda.maximo) {
      return auto.precio <= datosBusqueda.maximo;
   }
   return auto;
}
// Filtra por puertas

function filtrarPuertas(auto) {
   if (datosBusqueda.puertas) {
      return auto.puertas === datosBusqueda.puertas;
   }
   return auto;
}
// Filtra por transmision

function filtrarTransmision(auto) {
   if (datosBusqueda.transmision) {
      return auto.transmision === datosBusqueda.transmision;
   }
   return auto;
}

// Filtra por color

function filtrarColor(auto) {
   if (datosBusqueda.color) {
      return auto.color === datosBusqueda.color;
   }
   return auto;
}

// Mostrar mensaje de error cuando no se encuentra un resultado

function sinResultado() {
   limpiarHtml();
   const mensaje = document.createElement('p');
   mensaje.textContent = 'No se han encontrado autos con esas caracteristicas';
   mensaje.classList.add('error', 'alerta');
   contenedorResultado.appendChild(mensaje);
}
