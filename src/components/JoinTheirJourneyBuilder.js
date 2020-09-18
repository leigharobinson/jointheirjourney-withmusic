import React from "react";
import { Route } from "react-router-dom";
import NavBar from "../components/nav/Nav";
import ApplicationViews from "../components/ApplicationViews";

import "./JoinTheirJourneyBuilder.css";

export const JoinTheirJourney = () => {
  return (
    <React.Fragment>
      <img
        // className="headingOFApp"
        src={require("../components/images/music_note.png")}
        alt="placeholder"
      />
      <Route render={(props) => <NavBar {...props} />} />
      <ApplicationViews />
    </React.Fragment>
  );
};
