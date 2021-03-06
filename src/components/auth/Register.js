import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Button from "react-bootstrap/Button";
import "./Login.css";

const Register = (props) => {
  const email = useRef();
  const userName = useRef();
  const lastName = useRef();
  const password = useRef();
  const firstName = useRef();
  const title = useRef();
  const verifyPassword = useRef();
  const { register } = useSimpleAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = {
      username: userName.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      title: title.current.value,
    };

    register(newUser).then(() => {
      props.history.push("/patients");
    });
  };

  return (
    <>
      <main>
        <div className="buttonDiv">
          <div className="logo_bx ">
            <a href="/login">
              <img
                className="action_btn"
                alt="Join Their Journey with Music Logo"
                src={require("../images/JTJlogo.png")}
              />
            </a>
          </div>
        </div>
        <form className="form--register">
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <fieldset>
            <label htmlFor="userName"> Username </label>
            <input
              ref={userName}
              type="text"
              name="userName"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="firstName"> First Name </label>
            <input
              ref={firstName}
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="lastName"> Last Name </label>
            <input
              ref={lastName}
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              ref={email}
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="title"> Title </label>
            <input
              ref={title}
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="verifyPassword"> Verify Password </label>
            <input
              ref={verifyPassword}
              type="password"
              name="verifyPassword"
              className="form-control"
              placeholder="Verify password"
              required
            />
          </fieldset>
          <fieldset></fieldset>
        </form>
        <div className="buttonDiv">
          <Button onClick={handleRegister} type="submit">
            Register
          </Button>
          {/* <Button
            className="createNewUserBtn"
            type="button"
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Back
          </Button> */}
        </div>
      </main>
    </>
  );
};

export default withRouter(Register);
