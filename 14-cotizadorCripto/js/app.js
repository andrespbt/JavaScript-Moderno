// Selectores y variables
const cryptomonedaSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const criptomonedaSelect = document.querySelector('#criptomonedas');
const resultado = document.querySelector('#resultado');

// Objeto con valores elegidos por usuario
let objetoBusqueda = {
  moneda: '',
  criptomoneda: ''
};
// Eventos
document.addEventListener('DOMContentLoaded', () => {
  buscarCriptomoneda();

  formulario.addEventListener('submit', formSubmit);

  monedaSelect.addEventListener('change', leerValores);
  criptomonedaSelect.addEventListener('change', leerValores);
});

// Funciones

const obtenerCriptomonedas = criptomonedas =>
  new Promise(resolve => {
    resolve(criptomonedas);
  });

function buscarCriptomoneda() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
    .then(response => response.json())
    .then(criptomonedas => obtenerCriptomonedas(criptomonedas))
    .then(cripto => selectCripto(cripto.Data));
}

function selectCripto(criptomonedas) {
  criptomonedas.forEach(cripto => {
    const { Name, FullName } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    cryptomonedaSelect.appendChild(option);
  });
}

function formSubmit(e) {
  e.preventDefault();

  // Validar
  if (monedaSelect.value === '' || criptomonedaSelect.value === '') {
    imprimirAlerta('Elige una criptomoneda y una moneda para cotizar');
    return;
  }

  // Mostrar spinner
  mostrarSpinner();

  // Consultar la api con los resultados
  consultarApi();
}

function leerValores(e) {
  objetoBusqueda[e.target.name] = e.target.value;
}

function imprimirAlerta(mensaje) {
  const existeError = document.querySelector('.error');
  const divMensaje = document.createElement('div');
  divMensaje.classList.add('error');
  divMensaje.textContent = mensaje;

  if (!existeError) {
    formulario.appendChild(divMensaje);
  }

  setTimeout(() => {
    divMensaje.remove();
  }, 3000);
}

function consultarApi() {
  const { moneda, criptomoneda } = objetoBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  fetch(url)
    .then(response => response.json())
    .then(cripto => imprimirInfoHTML(cripto.DISPLAY[criptomoneda][moneda]));
}

function imprimirInfoHTML(infoCripto) {
  limpiarHtml();
  console.log(infoCripto);
  const { CHANGEPCTDAY, CIRCULATINGSUPPLY, HIGHDAY, LOWDAY, PRICE, MKTCAP, LASTUPDATE } = infoCripto;

  const divPrecio = document.createElement('div');
  divPrecio.classList.add('precio');
  divPrecio.innerHTML = `
  <p>Precio: ${PRICE}</p>
  <p>Precio mas alto del día: ${HIGHDAY}</p>
  <p>Precio mas bajo del día: ${LOWDAY}</p>
  <p>Variación en el día: ${CHANGEPCTDAY}%</p>
  <p>Cantidad circulante: ${CIRCULATINGSUPPLY}</p>
  <p>Capitalización de mercado: ${MKTCAP}</p>
  <p>Última actualización: ${LASTUPDATE}</p>
  `;

  resultado.appendChild(divPrecio);
}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHtml();
  const spinner = document.createElement('div');
  spinner.classList.add('sk-chase', 'spinner');
  spinner.innerHTML = `
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  `;

  resultado.appendChild(spinner);
}
