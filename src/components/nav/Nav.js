import React from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Nav.css";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <nav>
      <ul>
        {isAuthenticated() ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/patients">Patients</Link>
            </li>
            <li>
              <Link to="/caretakers">Profile</Link>
            </li>
            <li>
              <Link to="/songs">Songs</Link>
            </li>

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
          </>
        ) : (
          <>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li> */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
