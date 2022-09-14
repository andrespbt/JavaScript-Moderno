import React, { Fragment, useState } from 'react';
import { calcularTotal } from '../helpers';

const Formulario = props => {
  const { cantidad, guardarCantidad, plazo, guardarPlazo, total, guardarTotal, guardarCargando } = props;
  // Definir state
  const [error, guardarError] = useState(false);
  // Cuando el usuario hace click en submit
  const calcularPrestamo = e => {
    e.preventDefault();

    // Validar el form
    if (cantidad === 0 || plazo === '') {
      guardarError(true);
      return;
    }
    // Eliminar error previo
    guardarError(false);

    // Habilitar spinner
    guardarCargando(true);

    setTimeout(() => {
      // Realizar la cotizacion
      const total = calcularTotal(cantidad, plazo);

      // Una vez calculado guardar total
      guardarTotal(total);

      // Desabilitar el spinner
      guardarCargando(false);
    }, 3000);
  };
  return (
    <Fragment>
      <form onSubmit={calcularPrestamo}>
        <div className="row">
          <div>
            <label>Cantidad Prestamo</label>
            <input
              className="u-full-width"
              type="number"
              placeholder="Ejemplo: 3000"
              onChange={e => guardarCantidad(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Plazo para Pagar</label>
            <select className="u-full-width" onChange={e => guardarPlazo(parseInt(e.target.value))}>
              <option value="">Seleccionar</option>
              <option value="3">3 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Calcular" className="button-primary u-full-width" />
          </div>
        </div>
      </form>
      {error ? <p className="error">Todos los campos son obligatorios</p> : null}
    </Fragment>
  );
};

export default Formulario;
