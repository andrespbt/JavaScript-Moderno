// Selectores y variables
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const registrosPorPagina = 30;
let totalPaginas;
let iterador;
let paginaActual = 1;

// Eventos
window.onload = () => {
  formulario.addEventListener('submit', validarFormulario);
};

// Funciones

function validarFormulario(e) {
  e.preventDefault();
  const busquedaInput = document.querySelector('#termino').value;

  if (busquedaInput === '') {
    imprimirAlerta('Ingresa algo en el cuadro de busqueda');
    return;
  }

  buscarImagenes();
}

// Generador que va a registrar la cantidad de elementos de acuerdo a la pagina
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function buscarImagenes() {
  const busqueda = document.querySelector('#termino').value;
  const key = '29731120-ce8fae113263bf64ed699e979';
  const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${registrosPorPagina}&page=${paginaActual}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalPaginas = calcularPaginas(data.totalHits);
      mostrarImagenes(data.hits);
    });
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  imagenes.forEach(imagen => {
    const { likes, largeImageURL, previewURL, views } = imagen;
    resultado.innerHTML += `
  <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
    <div class="bg-white">
        <image class="w-full photo" src="${previewURL}">
        <div class="p-4">
            <p class="font-bold">${likes}<span class="font-light"> Me gusta</span></p>
            <p class="font-bold">${views}<span class="font-light"> Veces vista</span></p>

            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                Ver Imagen
            </a>
        </div>
    </div>
  </div>
  `;
  });

  // Limpiar paginador previo
  while (paginacionDiv.firstChild) {
    paginacionDiv.removeChild(paginacionDiv.firstChild);
  }

  // Generar paginador

  imprimirPaginador();
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);

  while (true) {
    const { value, done } = iterador.next();
    if (done) return;

    // Caso contrario genera un boton por cada elemento en el generador
    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.className = 'siguiente bg-yellow-400 px-4 py-1 mr-2 font-bold mb-10 uppercase rounded';
    boton.onclick = () => {
      paginaActual = value;
      buscarImagenes();
    };

    paginacionDiv.appendChild(boton);
  }
}
function imprimirAlerta(mensaje) {
  const alertaMostrada = document.querySelector('.bg-red-100');
  if (!alertaMostrada) {
    const alerta = document.createElement('div');
    alerta.className = 'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center';

    alerta.innerHTML = `
  <strong class='font-bold'>Error!</strong>
  <span class='block'>${mensaje}</span>
  `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}
