import { useState } from 'react';
import UsuariosList from '../components/UsuariosList.jsx';
import UsuarioForm from '../components/UsuarioForm.jsx';

function UsuariosPage() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(usuario) {
    setUsuarioSeleccionado(usuario);
  }

  function handleSuccess() {
    setUsuarioSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setUsuarioSeleccionado(null);
  }

  return (
    <div className="page">
      <h1 className="page-title">Gestión de Usuarios</h1>
      <UsuarioForm
        usuarioSeleccionado={usuarioSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <UsuariosList key={recargarLista} onEdit={handleEdit} />
    </div>
  );
}

export default UsuariosPage;
