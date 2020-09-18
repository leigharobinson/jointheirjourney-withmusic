import React from "react";
import { Link } from "react-router-dom";

export const PatientCard = (props) => {
  return (
    <>
      <div className="patientCard">
        <div className="patientCard-content">
          <button>
            <Link to={`/patients/${props.patient.id}`}>
              {" "}
              {props.patient.first_name} {props.patient.last_name}
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
