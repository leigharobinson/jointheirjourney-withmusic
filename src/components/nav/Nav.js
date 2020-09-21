import React, { useState } from "react";
// import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Nav.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <>
      <div>
        <Navbar color="faded" light>
          {isAuthenticated() ? (
            <>
              <NavbarBrand to="/patients">Patients</NavbarBrand>
              <NavbarToggler onClick={toggleNavbar} className="mr-2" />
              <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                  <Nav>
                    <NavLink href="/caretakers">Profile</NavLink>
                  </Nav>
                  {/* <Nav>
                  <NavLink href="/WayToGo">Profile</NavLink>
                </Nav> */}
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
                </Nav>
              </Collapse>
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
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
