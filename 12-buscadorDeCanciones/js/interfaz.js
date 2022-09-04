export const formularioBuscar = document.querySelector('#formulario-buscar'),
  divBuscar = document.querySelector('#buscar'),
  divMensajes = document.querySelector('#mensajes'),
  divResultado = document.querySelector('#resultado'),
  headingResultado = document.querySelector('.letra-resultado h2'),
  divContenido = document.querySelector('.contenido');

export class Interfaz {
  constructor() {}

  limpiarHtml() {
    while (divResultado.firstChild) {
      divResultado.removeChild(divResultado.firstChild);
    }
  }

  imprimirTitulo(artista, cancion) {
    const h2Artista = document.createElement('h2');
    const h4Cancion = document.createElement('h4');
    h4Cancion.textContent = cancion;
    h2Artista.textContent = artista;
    divResultado.appendChild(h2Artista);
    divResultado.appendChild(h4Cancion);
  }

  imprimirCancion(lyrics, artista, cancion) {
    this.limpiarHtml();
    this.imprimirTitulo(artista, cancion);
    const parrafoLyrics = document.createElement('p');
    parrafoLyrics.textContent = lyrics;
    divResultado.appendChild(parrafoLyrics);
  }

  imprimirError(mensaje) {
    this.limpiarHtml();
    const divError = document.createElement('div');
    divError.textContent = mensaje;
    divError.classList.add('error');
    divContenido.appendChild(divError);

    setTimeout(() => {
      divError.remove();
    }, 3000);
  }
}
