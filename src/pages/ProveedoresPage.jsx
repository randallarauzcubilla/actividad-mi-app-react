import { useState } from 'react';
import ProveedorForm from '../components/ProveedorForm.jsx';
import ProveedoresList from '../components/ProveedorList.jsx';

function ProveedoresPage() {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(proveedor) { setProveedorSeleccionado(proveedor); }
  function handleSuccess() { setProveedorSeleccionado(null); setRecargarLista((p) => p + 1); }
  function handleCancel() { setProveedorSeleccionado(null); }

  return (
    <div className="page">
      <h1 className="page-title">Gestión de Proveedores</h1>
      <ProveedorForm
        proveedorSeleccionado={proveedorSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <ProveedoresList recargar={recargarLista} onEdit={handleEdit} />
    </div>
  );
}

export default ProveedoresPage;
