import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { JoinTheirJourney } from "./components/JoinTheirJourneyBuilder";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <JoinTheirJourney />
  </Router>,
  document.getElementById("root")
);
