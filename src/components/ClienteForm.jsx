import { useEffect, useState } from 'react';
import { createCliente, updateCliente } from '../api/clientes';

const clienteInicial = {
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  direccion: ''
};

function ClienteForm({ clienteSeleccionado, onSuccess, onCancel }) {

  const [form, setForm] = useState(clienteInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (clienteSeleccionado) {

      setForm({
        nombre: clienteSeleccionado.nombre ?? '',
        apellido: clienteSeleccionado.apellido ?? '',
        correo: clienteSeleccionado.correo ?? '',
        telefono: clienteSeleccionado.telefono ?? '',
        direccion: clienteSeleccionado.direccion ?? ''
      });

    } else {

      setForm(clienteInicial);

    }

  }, [clienteSeleccionado]);

  function handleChange(e) {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  }

  async function handleSubmit(e) {

    e.preventDefault();

    setGuardando(true);
    setError(null);

    try {

      if (clienteSeleccionado?.id) {

        await updateCliente(clienteSeleccionado.id, form);

      } else {

        await createCliente(form);

      }

      onSuccess();

      setForm(clienteInicial);

    } catch (err) {

      setError(err.message);

    } finally {

      setGuardando(false);

    }

  }

  return (

    <div className="form-card">

      <h2>
        {clienteSeleccionado ? 'Editar cliente' : 'Nuevo cliente'}
      </h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="form-grid">

        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />

        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />

        <input
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder="Correo"
        />

        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />

        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />

        <button type="submit" disabled={guardando}>
          {guardando
            ? 'Guardando...'
            : clienteSeleccionado
            ? 'Actualizar'
            : 'Crear'}
        </button>

        {clienteSeleccionado && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}

      </form>

    </div>

  );
}

export default ClienteForm;