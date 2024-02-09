import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext'; // Update the import path based on your project structure
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Navbar = () => {
  const { isAuthenticated, logout ,setIsAuthenticated} = useContext(NoteContext); // Assuming you have a logout function in your context
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn")
    history.push('/')
    setIsAuthenticated(false)

  };
  
  console.log("isAuthenticated:", isAuthenticated);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <form className="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success mx-1">Search</button>
              <button className="btn btn-outline-danger mx-1" onClick={handleLogout}>Logout</button>
            </form>
          ) : (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;