import React, { useState } from "react";
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
  const { logout } = useSimpleAuth();
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/patients" className="mr-auto">
          Patients
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/caretakers">Profile</NavLink>
            </NavItem>
            <NavItem>
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
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
