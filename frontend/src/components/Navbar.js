import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">🚗 Vehicle Import</Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/vehicles">Vehicles</Link>

          {user ? (
            <>
              {user.role === 'admin' && (
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              )}
              <button className="btn btn-outline-light ms-2" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
