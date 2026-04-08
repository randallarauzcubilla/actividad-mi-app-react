import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/clientes';

function ClientesList({ onEdit, recargar }) {

  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  async function cargarClientes() {

    try {

      const data = await getClientes();

      setClientes(data);

    } catch (err) {

      setError(err.message);

    }

  }

  useEffect(() => {

    cargarClientes();

  }, [recargar]);

  async function handleDelete(id) {

    if (!confirm('¿Eliminar cliente?')) return;

    try {

      await deleteCliente(id);

      cargarClientes();

    } catch (err) {

      alert('Error: ' + err.message);

    }

  }

  if (error) return <p>Error: {error}</p>;

  return (

    <div>

      <h2>Lista de clientes</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {clientes.map(c => (

            <tr key={c.id}>

              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.correo}</td>
              <td>{c.telefono}</td>

              <td>

                <button onClick={() => onEdit(c)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(c.id)}>
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ClientesList;