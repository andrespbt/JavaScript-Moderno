// Variables
const tablaCarritos = document.querySelector('#lista-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const agregarCarritoBtn = document.querySelectorAll('.agregar-carrito');
let listaCursos = [];

// Llamando a los eventos

cargarEventListeners();

function cargarEventListeners() {
   // Agregar carrito con boton 'Agregar al Carrito'
   agregarCarritoBtn.forEach(boton => boton.addEventListener('click', agregarCurso));

   // Elimina carrito con boton
   tablaCarritos.addEventListener('click', eliminarCurso);

   // Vaciar carrito
   vaciarCarritoBtn.addEventListener('click', () => {
      listaCursos = [];
      vaciarContenedor();
   });
}

// Funciones

// Agregar curso al html

function agregarCurso(e) {
   e.preventDefault();
   const informacionCurso = e.target.parentElement.parentElement;

   // Capturar informacion del curso
   const infoCurso = capturarInformacionCurso(informacionCurso);

   // Comprobamos si el curso existe en el carrito
   const existe = listaCursos.some(curso => curso.id === infoCurso.id);
   if (existe) {
      // Si existe creamos un nuevo array con las cantidades actualizadas
      listaCursos.map(curso => {
         if (curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso;
         } else {
            return curso;
         }
      });
   } else {
      // Si no existe lo agregamos
      listaCursos = [...listaCursos, infoCurso];
   }

   // Agregar cursos al html
   agregarAlHtml(listaCursos);
}

function agregarAlHtml(lista) {
   // Vaciar contenedor carrito
   vaciarContenedor();

   // Iterar lista y agregar elementos html
   lista.forEach(curso => {
      const { imagen, nombre, precio, cantidad, id } = curso;
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src = "${imagen}" width="150"></img></td>
        <td><p>${nombre}</p></td>
        <td><p>${precio}</p></td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id = "${id}"/> X </a>
        </td>
  
        `;

      contenedorCarrito.appendChild(row);
   });
}

// Capturar informacion del curso

function capturarInformacionCurso(informacionCurso) {
   let informacion = {
      imagen: informacionCurso.querySelector('img').src,
      nombre: informacionCurso.querySelector('.info-card h4').textContent,
      precio: informacionCurso.querySelector('.info-card .precio span').textContent,
      id: informacionCurso.querySelector('.info-card a').getAttribute('data-id'),
      cantidad: 1,
   };
   return informacion;
}

// Vaciar contenedor carrito

function vaciarContenedor() {
   while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
   }
}

// Eliminar un curso del carrito

function eliminarCurso(e) {
   // Capturar posicion del curso en array
   const indexCurso = listaCursos.findIndex(curso => curso.id === e.target.getAttribute('data-id'));
   // Si el usuario hace click en boton borrar curso
   if (e.target.classList.contains('borrar-curso')) {
      // Si el curso a borrar tiene mas de 1 cantidad le restamos 1 , sino lo eliminamos
      if (listaCursos[indexCurso].cantidad > 1) {
         listaCursos[indexCurso].cantidad -= 1;
      } else {
         listaCursos = listaCursos.filter(curso => curso.id !== e.target.getAttribute('data-id'));
      }
   }
   agregarAlHtml(listaCursos);
}
