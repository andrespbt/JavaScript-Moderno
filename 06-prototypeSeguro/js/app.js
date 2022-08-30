// Crear prototypes

function Seguro(marca, year, tipo) {
   this.marca = marca;
   this.year = year;
   this.tipo = tipo;
}

// Cotizar seguro
Seguro.prototype.cotizarSeguro = function () {
   let resultado;
   const base = 2000;
   /*
    Aumento de precio segun marca:

    Americano = 1.15
    Asiatico = 1.05
    Europeo = 1.30
    */

   switch (this.marca) {
      case '1':
         resultado = base * 1.15;
         break;
      case '2':
         resultado = base * 1.05;
         break;
      case '3':
         resultado = base * 1.3;
         break;
      default:
         break;
   }

   // Restar un 3% al precio por cantidad de años de diferencia con el año actual
   const cantidadDescuento = (new Date().getFullYear() - this.year) * 3;
   resultado -= resultado * (cantidadDescuento / 100);

   /*
   Si el seguro es basico se le suma un 30%
   Si el seguro es completo se le suma un 50%
    */
   if (this.tipo === 'basico') {
      resultado *= 1.3;
   } else {
      resultado *= 1.5;
   }
   return resultado;
};

function UI() {}

// Llenar el select year
UI.prototype.llenarSelectYear = () => {
   const max = new Date().getFullYear();
   const min = max - 20;
   const yearSelect = document.querySelector('#year');

   for (let i = max; i > min; i--) {
      const year = document.createElement('option');
      year.value = i;
      year.textContent = i;

      yearSelect.appendChild(year);
   }
};

// Mostrar mensaje
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
   // Crear div y agregar clase mensaje
   const formulario = document.querySelector('#cotizar-seguro');
   const div = document.createElement('div');
   const spinner = document.querySelector('#cargando');
   const button = document.querySelector('#submitBtn');
   div.classList.add('mensaje', 'mt-10');
   div.textContent = mensaje;

   if (tipo === 'error') {
      div.classList.add('error');
   } else {
      div.classList.add('correcto');
      spinner.classList.remove('hidden');
      button.setAttribute('type', 'button');
   }

   formulario.insertBefore(div, document.querySelector('#resultado'));

   setTimeout(() => {
      div.remove();
      spinner.classList.add('hidden');
      button.setAttribute('type', 'submit');
   }, 3000);
};

// Mostrar resultado
UI.prototype.mostrarResultado = (seguro, total) => {
   const div = document.createElement('div');
   const resultadoContainer = document.querySelector('#resultado');
   const { marca, year, tipo } = seguro;
   let textoMarca;
   // Pasar marca de numero a nombre
   switch (marca) {
      case '1':
         textoMarca = 'Americano';
         break;
      case '2':
         textoMarca = 'Asiatico';
         break;
      case '3':
         textoMarca = 'Europeo';
         break;
      default:
         break;
   }
   div.classList.add('mt-10');
   div.innerHTML = `
   <p class="header">Resultado</p>
   <p class="font-bold">Marca: <span class = "font-normal">${textoMarca}</span></p>
   <p class="font-bold">Año: <span class = "font-normal">${year}</span></p>
   <p class="font-bold">Tipo: <span class = "font-normal capitalize">${tipo}</span></p>
   <p class="font-bold">Total a pagar: <span class = "font-normal">$${total}</span></p>
   `;

   setTimeout(() => {
      resultadoContainer.appendChild(div);
   }, 3000);
};

//Instanciar UI
const ui = new UI();

// Al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
   ui.llenarSelectYear();
   eventListeners(); // Llenar el select con los años
});

// Eventos

function eventListeners() {
   const formulario = document.querySelector('#cotizar-seguro');
   formulario.addEventListener('submit', cotizarSeguro);
}

// Funciones

function cotizarSeguro(e) {
   e.preventDefault();

   // Leer Marca
   const marca = document.querySelector('#marca').value;

   // Leer año
   const year = document.querySelector('#year').value;

   // Leer tipo
   const tipo = document.querySelector('input[name="tipo"]:checked').value;

   // Mostrar mensaje
   if (marca === '' || year === '' || tipo === '') {
      ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
      return;
   }
   ui.mostrarMensaje('Cotizando seguro', 'correcto');

   // Instanciar seguro
   const seguro = new Seguro(marca, year, tipo);

   // Cotizar seguro
   const total = seguro.cotizarSeguro();

   // Eliminar resultado si existe
   const resultadoMostrado = document.querySelector('#resultado div');
   if (resultadoMostrado != null) {
      resultadoMostrado.remove();
   }
   // Mostrar resultado
   ui.mostrarResultado(seguro, total);
}
