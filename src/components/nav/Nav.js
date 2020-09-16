import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"
import UseSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Nav.css";

const NavBar = (props) => {
  const { isAuthenticated, logout } = UseSimpleAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/patients">Patients</Link>
        </li>
        <li>
          <Link to="/songs">Songs</Link>
        </li>

        {isAuthenticated() ? (
          <li className="nav-item">
            <button
              className="nav-link fakeLink"
              onClick={() => {
                logout();
                props.history.push({
                  pathname: "/",
                });
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
