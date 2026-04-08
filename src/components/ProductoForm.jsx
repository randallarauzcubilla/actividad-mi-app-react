import { useEffect, useState } from 'react';
import { createProducto, updateProducto } from '../api/productos';

const productoInicial = {
  nombre: '',
  precio: '',
  stock: '',
};

function ProductoForm({ productoSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(productoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productoSeleccionado) {
      setForm({
        nombre: productoSeleccionado.nombre ?? '',
        precio: productoSeleccionado.precio ?? '',
        stock: productoSeleccionado.stock ?? '',
      });
    } else {
      setForm(productoInicial);
    }
  }, [productoSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      const payload = {
        ...form,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock, 10),
      };
      if (productoSeleccionado?.id) {
        await updateProducto(productoSeleccionado.id, payload);
      } else {
        await createProducto(payload);
      }
      onSuccess();
      setForm(productoInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="form-card">
      <h2>{productoSeleccionado ? 'Editar producto' : 'Nuevo producto'}</h2>
      {error && <p className="error-msg">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label>Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div className="form-field">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-field">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={guardando}>
            {guardando ? 'Guardando...' : productoSeleccionado ? 'Actualizar' : 'Crear'}
          </button>
          {productoSeleccionado && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductoForm;