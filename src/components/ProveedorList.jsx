import { useEffect, useState } from 'react';
import { getProveedores, deleteProveedor } from '../api/proveedores';

function ProveedoresList({ onEdit, recargar }) {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarProveedores() {
    try {
      setCargando(true);
      setError(null);
      const data = await getProveedores();
      setProveedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => { cargarProveedores(); }, [recargar]);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este proveedor?')) return;
    try {
      await deleteProveedor(id);
      await cargarProveedores();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p className="status-msg">Cargando proveedores...</p>;
  if (error)    return <p className="error-msg">Error: {error}</p>;

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Lista de proveedores</h2>
        <button className="btn btn-secondary" onClick={cargarProveedores}>↺ Recargar</button>
      </div>
      {proveedores.length === 0 ? (
        <p className="status-msg">No hay proveedores registrados.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.empresa}</td>
                <td>{p.correo}</td>
                <td>{p.telefono}</td>
                <td className="actions-cell">
                  <button className="btn btn-edit" onClick={() => onEdit(p)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProveedoresList;