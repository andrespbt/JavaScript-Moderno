// Selectores y variables
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// Eventos
window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
});

// Funciones
function buscarClima(e) {
  e.preventDefault();

  // Validar formulario
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    mostrarError('Ambos cambios son obligatorios', 'error');
    return;
  }

  // Consultamos la API

  consultarApi(ciudad, pais);
}

function consultarApi(ciudad, pais) {
  const appID = 'fa9c278fd470c68296a5d3764c6ae868';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  spinner();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        mostrarError('Ciudad no encontrada');
        return;
      }

      // Imprime la respuesta en el html
      setTimeout(() => {
        // Limpiar html previo
        limpiarHtml();
        mostrarClima(data);
      }, 1000);
    });
}

function mostrarClima(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const tempCentigrados = kelvinACentrigrados(temp);
  const tempMaxCentigrados = kelvinACentrigrados(temp_max);
  const tempMinCentigrados = kelvinACentrigrados(temp_min);

  const actual = document.createElement('p');
  actual.innerHTML = `${tempCentigrados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMax = document.createElement('p');
  tempMax.innerHTML = `Max: ${tempMaxCentigrados} &#8451;`;
  tempMax.classList.add('text-xl');

  const tempMin = document.createElement('p');
  tempMin.innerHTML = `Min: ${tempMinCentigrados} &#8451;`;
  tempMin.classList.add('text-xl');

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Temperatura en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  resultadoDiv.insertBefore(nombreCiudad, actual);

  resultado.appendChild(resultadoDiv);
}

// Transformar de grados kelvin a centigrados

const kelvinACentrigrados = grados => parseInt(grados - 273.15);

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');

  if (!alerta) {
    // Crear alerta
    const alerta = document.createElement('div');
    alerta.className = ' bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-6 text-center';
    alerta.innerHTML = `
  <strong class = "font-bold">Error!</strong>
  <span class = "block">${mensaje}</span>
  `;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  limpiarHtml();
  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
  <div class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
</div>
  `;

  resultado.appendChild(divSpinner);
}
