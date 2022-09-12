const nombreCache = 'apv-5';
const archivos = [
  './',
  './index.html',
  './css/bootstrap.css',
  './css/styles.css',
  './js/app.js',
  './js/apv.js',
  './error.html'
];

// Cuando se instala el service worker
self.addEventListener('install', e => {
  console.log('Instalando el service worker');
  e.waitUntil(
    caches.open(nombreCache).then(cache => {
      console.log('Cacheando');
      cache.addAll(archivos);
    })
  );
});

// Activar el service worker
self.addEventListener('activate', e => {
  console.log('Sw activado');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== nombreCache).map(key => caches.delete(key)));
    })
  );
});

// Eventos fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
  console.log('Fetch', e);

  e.respondWith(
    caches.match(e.request).then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('error.html')))
  );
});
