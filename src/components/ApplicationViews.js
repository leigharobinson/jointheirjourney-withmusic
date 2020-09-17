import { Route } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import { PatientList } from "./patient/PatientList";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { Home } from "../components/home/Home";
const ApplicationViews = () => {
  return (
    <React.Fragment>
      <Route
        path="/"
        render={(props) => {
          return <Home />;
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

      <Route
        exact
        path="/patients"
        render={(props) => {
          return <PatientList {...props} />;
        }}
      />
      {/* <Route
        exact
        path="/products/:productId(\d+)"
        render={(props) => {
          return (
            <ProductDetail
              productId={props.match.params.productId}
              {...props}
            />
          );
        }}
      />
      <Route
        path="/sell-product"
        render={(props) => {
          return <ProductForm {...props} />;
        }}
      />
      <Route
        path="/payments/form"
        render={(props) => {
          return <PaymentTypeForm {...props} />;
        }}
      />
      <Route
        path="/products/cart"
        render={(props) => {
          return <Cart />;
        }}
      /> */}
    </React.Fragment>
  );
};

export default withRouter(ApplicationViews);
