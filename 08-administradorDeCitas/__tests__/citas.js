/**
 * @jest-environment jsdom
 */
import Citas from '../js/classes/Citas';

describe('Probar la clase de citas', () => {
  const administrarCitas = new Citas();
  test('Agregar una nueva cita', () => {
    const datosCliente = {
      mascota: 'Hook',
      propietario: 'Andres Poblete',
      telefono: '231313',
      fecha: '10-12-2015',
      hora: '12:20',
      sintomas: 'Solo duerme'
    };

    datosCliente.id = Date.now();

    administrarCitas.agregarCita(datosCliente);

    // Test
    expect(administrarCitas).toMatchSnapshot();
  });
});
