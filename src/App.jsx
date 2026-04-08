import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import UsuariosPage from './pages/UsuariosPage';
import ProductosPage from './pages/ProductosPage';
import ProveedoresPage from './pages/ProveedoresPage';
import ClientesPage from './pages/ClientesPage';

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <main className="main-content">

        <Routes>

          <Route path="/" element={<Navigate to="/usuarios" replace />} />

          <Route path="/usuarios" element={<UsuariosPage />} />

          <Route path="/productos" element={<ProductosPage />} />

          <Route path="/proveedores" element={<ProveedoresPage />} />

          <Route path="/clientes" element={<ClientesPage />} />

        </Routes>

      </main>

    </BrowserRouter>

  );

}

export default App;