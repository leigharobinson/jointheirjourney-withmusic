import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";

const SongResponseForm = (props) => {
  const { isAuthenticated } = useSimpleAuth();

  return (
    <>
      <h1>Song Response Form</h1>
    </>
  );
};

export default SongResponseForm;
