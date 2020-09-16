import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Register } from "./components/auth/Register";
import Login from "./components/auth/Login";
import NavBar from "./components/nav/Nav";

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <h2> Join Their Journey With Music</h2>
    <small>
      An App focused on taping into the power of music and memory with those
      struggling with Dementia
    </small>
    <Login />
    <Register />
  </React.StrictMode>,
  document.getElementById("root")
);
