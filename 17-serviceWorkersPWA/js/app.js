if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(registrado => console.log('Se registro el service workder', registrado))
    .catch(err => console.log('Fallo la instalacion', err));
} else {
  console.log('Service workers no soportado');
}
