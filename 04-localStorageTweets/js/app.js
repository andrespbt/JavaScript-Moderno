// Variables
const formulario = document.querySelector('#formulario');
const textArea = document.querySelector('#tweet');
const botonAgregar = document.querySelector('.button');
const contenedorTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Eventos
agregarEventos();
function agregarEventos() {
   document.addEventListener('DOMContentLoaded', inicializarApp);
   textArea.addEventListener('input', habilitarBoton);
   formulario.addEventListener('submit', agregarTweet);
}

// Funciones

function inicializarApp() {
   // Desabilitar boton al inicializar la app
   botonAgregar.disabled = true;
   botonAgregar.style.cursor = 'not-allowed';
   botonAgregar.style.opacity = '0.5';
   // Obtener tweets del local storage si hay
   tweets = JSON.parse(localStorage.getItem('tweets')) || [];
   mostrarHtml();
}

function habilitarBoton(e) {
   // Si el usuario ingreso un texto habilitar boton sino desabilitarlo
   if (e.target.value.length > 0) {
      botonAgregar.disabled = false;
      botonAgregar.style.cursor = 'pointer';
      botonAgregar.style.opacity = '1';
   } else {
      inicializarApp();
   }
}

function agregarTweet(e) {
   e.preventDefault();

   // Crear objeto tweet y agregarlo al array de tweets
   agregarAlArray();

   // Mostrarlo en el HTML
   mostrarHtml();

   // Limpiar el formulario
   formulario.reset();

   // Desabilitar boton
   inicializarApp();
}

function agregarAlArray() {
   // Guardar el tweet
   const tweet = textArea.value;
   // Crear id unico con date.now
   const id = Date.now();

   // Crear objeto tweet y agregar datos
   let datosTweet = {
      id,
      tweet,
   };

   tweets = [...tweets, datosTweet];
}

function mostrarHtml() {
   // Limpiar el html
   limpiarHtml();

   // Insertar tweets
   tweets.forEach(tweet => {
      // Crear elemento de lista y boton para eliminar
      const elemento = document.createElement('li');
      const eliminarBtn = document.createElement('a');
      // Agregar contenido y clases
      elemento.textContent = tweet.tweet;
      eliminarBtn.classList.add('borrar-tweet');
      eliminarBtn.textContent = 'X';
      // Agregar evento onclick para eliminar tweet y filtrar array tweets
      eliminarBtn.onclick = () => {
         tweets = tweets.filter(elemento => elemento.id !== tweet.id);
         mostrarHtml();
      };
      // Agregar boton al elemento y agregar el elemento al contenedor
      elemento.appendChild(eliminarBtn);
      contenedorTweets.appendChild(elemento);
   });

   // Sincronizar storage
   sincronizarStorage();
}

// Limpia el html

function limpiarHtml() {
   while (contenedorTweets.firstChild) {
      contenedorTweets.removeChild(contenedorTweets.firstChild);
   }
}

// Agrega los tweets al local storage
function sincronizarStorage() {
   localStorage.setItem('tweets', JSON.stringify(tweets));
}
