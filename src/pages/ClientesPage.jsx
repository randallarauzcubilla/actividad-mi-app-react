import { useState } from 'react';
import ClientesList from "../components/ClienteList.jsx";
import ClienteForm  from "../components/ClienteForm.jsx";

function ClientesPage() {

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(cliente) {
    setClienteSeleccionado(cliente);
  }

  function handleSuccess() {
    setClienteSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setClienteSeleccionado(null);
  }

  return (
    <div className="page">

      <h1 className="page-title">Gestión de Clientes</h1>

      <ClienteForm
        clienteSeleccionado={clienteSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

      <ClientesList
        recargar={recargarLista}
        onEdit={handleEdit}
      />

    </div>
  );
}

export default ClientesPage;