import { useState } from "react";

const useSimpleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = () =>
    isLoggedIn || localStorage.getItem("musicmemoryapi_token") !== null;

  const register = (userInfo) => {
    return fetch("http://localhost:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("token" in res) {
          localStorage.setItem("musicmemoryapi_token", res.token);
          setIsLoggedIn(true);
        }
      });
  };

  const login = (credentials) => {
    return fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("musicmemoryapi_token", res.token);
          setIsLoggedIn(true);
        } else {
          alert("No Match found, please register");
          setIsLoggedIn(false);
        }
      });
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("musicmemoryapi_token");
  };

  return { isAuthenticated, logout, login, register };
};

export default useSimpleAuth;
