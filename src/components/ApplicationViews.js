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
import SongListPatient from "../components/song/SongListPatient";
import CaretakerList from "../components/caretaker/CaretakerList";
// import CaretakerDetail from "../components/caretaker/CaretakerDetail";

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
        <Route
          exact
          path="/songs"
          render={(props) => {
            if (isAuthenticated()) {
              return <SongListPatient {...props} />;
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />

        <Route
          exact
          path="/"
          render={(props) => {
            if (isAuthenticated()) {
              return <Home />;
            } else {
              return <Redirect to="Login" />;
            }
          }}
        />
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
        {/* <Route
          exact
          path="/caretakers/:caretakerId(\d+)"
          render={(props) => {
            if (isAuthenticated()) {
              return (
                <CaretakerDetail
                  caretakerId={props.match.params.caretakerId}
                  {...props}
                />
              );
            } else {
              return <Redirect to="Login" />;
            }
          }}
        /> */}
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
