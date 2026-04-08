import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">

      <span className="navbar-brand">Mi Aplicación - {import.meta.env.VITE_AUTHOR} _</span>

      <div className="navbar-links">

        <NavLink
          to="/usuarios"
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
        >
          Usuarios
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
        >
          Productos
        </NavLink>

        <NavLink
          to="/proveedores"
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
        >
          Proveedores
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link--active' : '')}
        >
          Clientes
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;