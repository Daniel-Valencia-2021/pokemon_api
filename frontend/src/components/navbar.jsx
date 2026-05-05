import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Pokédex</h2>

      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/create">Crear</Link>
        <Link to="/edit">Editar</Link>
        <Link to="/delete">Eliminar</Link>
        <Link to="/details">Detalles</Link>
      </div>
    </nav>
  );
}

export default Navbar;