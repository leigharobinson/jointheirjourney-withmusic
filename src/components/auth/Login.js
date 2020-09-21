import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { SongList } from "../../components/song/SongList";
import { Button } from "reactstrap";
import "./Login.css";

const Login = (props) => {
  const username = useRef();
  const password = useRef();
  const { isAuthenticated, login } = useSimpleAuth();

  // Simplistic handler for login submit
  const handleLogin = (e) => {
    e.preventDefault();

    /*
            For now, just store the username and password that
            the customer enters into local storage.
        */
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };
    // console.log(credentials);
    // Wanted to write an function that would stop patient view from being rendered if
    // a Caretaker hasn't
    login(credentials).then(() => {
      if (isAuthenticated !== null) {
        props.history.push({
          pathname: "/patients",
        });
      }
    });
  };

  return (
    <main style={{ textAlign: "center" }}>
      <div className="loginCard">
        <form className="form--login" onSubmit={handleLogin}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <fieldset>
            <label htmlFor="inputUsername"> Username </label>
            <input
              ref={username}
              type="username"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset>
            <Button type="submit">Sign in</Button>
          </fieldset>
        </form>
        <div className="buttonDiv2">
          <Button
            className="createNewUserBtn"
            type="button"
            onClick={() => {
              props.history.push("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
      <div>
        <SongList />
      </div>
    </main>
  );
};

export default withRouter(Login);
