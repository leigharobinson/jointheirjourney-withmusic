import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import { JoinTheirJourney } from "./components/JoinTheirJourneyBuilder";
import { Register } from "./components/auth/Register";
import Login from "./components/auth/Login";

export const ApplicationView = () => {
  return (
    <>
      <Route
        path="/"
        renter={(props) => {
          return <JoinTheirJourney />;
        }}
      />

      <Route
        path="/register"
        render={(props) => {
          return <Register {...props} />;
        }}
      />
      <Route
        path="/login"
        render={(props) => {
          return <Login {...props} />;
        }}
      />
    </>
  );
};
