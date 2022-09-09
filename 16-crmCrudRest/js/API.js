const url = 'http://localhost:3000/Clientes';

// Crear un nuevo cliente
export const nuevoCliente = async cliente => {
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
};

// Obtener clientes
export const obtenerClientes = async () => {
  try {
    const resultado = await fetch(url);
    const clientes = await resultado.json();
    return clientes;
  } catch (error) {
    console.log(error);
  }
};

// Elimina un cliente
export const eliminarCliente = async id => {
  try {
    await fetch(`${url}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.log(error);
  }
};

// Obtiene un cliente por su id

export const obtenerClienteId = async id => {
  try {
    const result = await fetch(`${url}/${id}`);
    const cliente = await result.json();
    return cliente;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar un cliente

export async function actualizarCliente(clienteActualizado) {
  const { id } = clienteActualizado;
  console.log(clienteActualizado);
  try {
    await fetch(`${url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(clienteActualizado),
      headers: { 'Content-Type': 'application/json' }
    });
    window.location.href = 'index.html';
  } catch (error) {
    console.log(error);
  }
}
