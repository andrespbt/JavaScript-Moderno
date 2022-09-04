import * as UI from './interfaz.js';

const ui = new UI.Interfaz();

class API {
  constructor(artista, cancion) {
    this.artista = artista.toLowerCase().split(' ').join('');
    this.cancion = cancion.toLowerCase().split(' ').join('');
  }

  consultarAPI() {
    const url = `https://www.azlyrics.com/lyrics/${this.artista}/${this.cancion}.html`;

    fetch(url)
      .then(response => response.text())
      .then(data => {
        let findDiv = false;
        let lyrics;

        // Obtener letra de la cancion, nombre del artista y nombre de la cancion navegando el dom
        const dataLyrics = new DOMParser()
          .parseFromString(data, 'text/html')
          .body.querySelector('div.container.main-page div.row .col-xs-12')
          .querySelectorAll('div');

        Array.from(dataLyrics).forEach(div => {
          if (div.classList.length === 0 && findDiv === false) {
            lyrics = div.textContent;
            findDiv = true;
          }
        });

        const dataArtist = new DOMParser()
          .parseFromString(data, 'text/html')
          .body.querySelector('div.container.main-page div.row .col-xs-12 div.lyricsh h2 a b')
          .textContent.replace('Lyrics', '');

        const song = new DOMParser()
          .parseFromString(data, 'text/html')
          .body.querySelector('div.container.main-page div.row .col-xs-12 .div-share h1')
          .textContent.replace('lyrics', '');

        ui.imprimirCancion(lyrics, dataArtist, song);
      })
      .catch(err => {
        ui.imprimirError('No encontramos tu cancion');
      });
  }
}

export default API;
