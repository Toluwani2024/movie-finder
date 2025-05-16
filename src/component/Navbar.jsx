// ✅ Navbar.jsx (in src/component/Navbar/Navbar.jsx)
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎬 MovieFinder</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </div>
    </nav>
  );
};

export default Navbar;
