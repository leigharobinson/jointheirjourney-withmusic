import React from "react";
import { Link } from "react-router-dom";

export const CaretakerCard = (props) => {
  return (
    <>
      <div className="caretakerCard">
        <div className="caretakerCard-content">
          <p>{props.caretaker.title}</p>
        </div>
      </div>
    </>
  );
};
