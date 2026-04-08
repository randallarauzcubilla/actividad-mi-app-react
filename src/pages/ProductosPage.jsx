import { useState } from 'react';
import ProductosList from '../components/ProductoList.jsx';
import ProductoForm from '../components/ProductoForm.jsx';

function ProductosPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(producto) {
    setProductoSeleccionado(producto);
  }

  function handleSuccess() {
    setProductoSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setProductoSeleccionado(null);
  }

  return (
    <div className="page">
      <h1 className="page-title">Gestión de Productos</h1>
      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <ProductosList
        recargar={recargarLista}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default ProductosPage;
