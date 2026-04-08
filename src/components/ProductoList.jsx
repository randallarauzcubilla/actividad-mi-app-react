import { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../api/productos';

function ProductosList({ onEdit, recargar }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargarProductos() {
    try {
      setCargando(true);
      setError(null);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, [recargar]);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      await cargarProductos();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p className="status-msg">Cargando productos...</p>;
  if (error) return <p className="error-msg">Error: {error}</p>;

  return (
    <div className="list-card">
      <div className="list-header">
        <h2>Lista de productos</h2>
        <button className="btn btn-secondary" onClick={cargarProductos}>↺ Recargar</button>
      </div>
      {productos.length === 0 ? (
        <p className="status-msg">No hay productos registrados.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${Number(p.precio).toFixed(2)}</td>
                <td>{p.stock}</td>
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

export default ProductosList;