import { useEffect, useState } from 'react';
import { createProveedor, updateProveedor } from '../api/proveedores';

const proveedorInicial = { nombre: '', telefono: '', correo: '', empresa: '' };

function ProveedorForm({ proveedorSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(proveedorInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (proveedorSeleccionado) {
      setForm({
        nombre:   proveedorSeleccionado.nombre   ?? '',
        telefono: proveedorSeleccionado.telefono ?? '',
        correo:   proveedorSeleccionado.correo   ?? '',
        empresa:  proveedorSeleccionado.empresa  ?? '',
      });
    } else {
      setForm(proveedorInicial);
    }
  }, [proveedorSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (proveedorSeleccionado?.id) {
        await updateProveedor(proveedorSeleccionado.id, form);
      } else {
        await createProveedor(form);
      }
      onSuccess();
      setForm(proveedorInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="form-card">
      <h2>{proveedorSeleccionado ? 'Editar proveedor' : 'Nuevo proveedor'}</h2>
      {error && <p className="error-msg">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del contacto" required />
        </div>
        <div className="form-field">
          <label>Empresa</label>
          <input name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de la empresa" required />
        </div>
        <div className="form-field">
          <label>Correo</label>
          <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@empresa.com" required />
        </div>
        <div className="form-field">
          <label>Teléfono</label>
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+506 0000-0000" required />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={guardando}>
            {guardando ? 'Guardando...' : proveedorSeleccionado ? 'Actualizar' : 'Crear'}
          </button>
          {proveedorSeleccionado && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProveedorForm;