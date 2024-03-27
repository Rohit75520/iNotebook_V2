import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/noteContext"; // Update the import path based on your project structure
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const { isAuthenticated, logout, setIsAuthenticated } =
    useContext(NoteContext); // Assuming you have a logout function in your context
  const location = useLocation();
  const history = useHistory();
  // const login = Boolean
  // const login = JSON.parse(window.localStorage.getItem("isloggedIn"))

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    history.push("/");
    setIsAuthenticated(false);
    logout();
  };
  const isLogin = JSON.parse(localStorage.getItem("isloggedIn"));


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={isLogin ? "/home" : "/loginError"}>
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
                className={`nav-link ${
                  location.pathname === "/home" ? "active" : ""
                }`}
                aria-current="page"
                to={isLogin ? "/home" : "/loginError"}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/invoice" ? "active" : ""
                }`}
                to="/invoice"
              >
                Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            
          </ul>
          {isLogin ? (
            <form className="d-flex">
              {/* search bar */}
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
              <button className="btn btn-outline-success mx-1">Search</button> */}
              <i
                className="fa-sharp fa-solid fa-right-from-bracket"

                onClick={handleLogout}
                style={{ color: "red" }}
              ></i>
              
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
