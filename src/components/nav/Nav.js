import React from "react";

import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Nav } from "react-bootstrap";
import "./Nav.css";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <div className="bkg_color">
      {isAuthenticated() ? (
        <>
          <Navbar className="color_nav">
            <Navbar.Brand href="/caretakers">
              <img
                src={require("../images/JTJlogo.png")}
                width="70"
                height="70"
                className="d-inline-block align-top"
                alt="Join Their Journey logo"
              />
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/caretakers">Profile</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/patients">Patients</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>Resorces</Nav.Link>
            </Nav>

            <Nav>
              <Button
                className="nav-link fakeLink"
                onClick={() => {
                  logout();
                  props.history.push({
                    pathname: "/login",
                  });
                }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar>
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
    </div>
  );
};

export default NavBar;
