import React from 'react';

const Resultado = ({ total, plazo, cantidad }) => (
  <div className="u-full-width resultado">
    <h2>Resumen</h2>
    <p>
      Cantidad solicitada es: <strong>${cantidad}</strong>
    </p>
    <p>
      A pagar en: <strong>{plazo} meses</strong>
    </p>
    <p>
      Su pago mensual es de: <strong>${(total / plazo).toFixed(2)}</strong>
    </p>
    <p>
      Total a pagar: <strong>${total.toFixed(2)}</strong>
    </p>
  </div>
);

export default Resultado;
