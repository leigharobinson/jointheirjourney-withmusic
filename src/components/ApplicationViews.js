import { Route, Redirect, Switch } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import PatientList from "./patient/PatientList";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { Home } from "../components/home/Home";
import PatientDetail from "../components/patient/PatientDetail";
import PatientForm from "../components/patient/PatientForm";
import PatientEdit from "../components/patient/PatientEdit";
import { SongList } from "../components/song/SongList";
import SongResponseForm from "../components/songresponse/SongResponseForm";
import CaretakerList from "../components/caretaker/CaretakerList";
import { CaretakerEdit } from "../components/caretaker/CaretakerEdit";
import { SongResponseEdit } from "./songresponse/SongResponseEdit";

const ApplicationViews = () => {
  const { isAuthenticated } = useSimpleAuth();

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/register"
          render={(props) => {
            return <Register {...props} />;
          }}
        />

        <Route
          exact
          path="/login"
          render={(props) => {
            return <Login {...props} />;
          }}
        />
        <Route
          exact
          path="/songs?birth_year=:year"
          render={(props) => {
            return <SongList {...props} />;
          }}
        />
        {/* This is Where Home Starts  */}
        <Route
          exact
          path="/"
          render={(props) => {
            if (isAuthenticated()) {
              return <Home {...props} />;
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        {/* This is Where Caretaker Starts  */}
        <Route
          exact
          path="/caretakers"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <CaretakerList
                  patientId={props.match.params.patientId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        <Route
          exact
          path="/caretakers/edit/:caretakerId(\d+)"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <CaretakerEdit
                  caretakerId={props.match.params.caretakerId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        {/* This is Where Patient Starts  */}
        <Route
          exact
          path="/patients"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <PatientList
                  patientId={props.match.params.patientId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        <Route
          exact
          path="/patients/:patientId(\d+)"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <PatientDetail
                  patientId={props.match.params.patientId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        <Route
          path="/patients/form"
          render={(props) => {
            if (isAuthenticated()) {
              return <PatientForm {...props} />;
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        <Route
          exact
          path="/patients/:patientId(\d+)/edit"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <PatientEdit
                  patientId={props.match.params.patientId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        {/* This is Where Patient Starts  */}
        <Route
          exact
          path="/songresponses/form"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <SongResponseForm
                  patientId={props.match.params.patientId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
        <Route
          exact
          path="/songresponses/edit/:responseId(\d+)"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <SongResponseEdit
                  responseId={props.match.params.responseId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
