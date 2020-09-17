import React from "react";
import { Link } from "react-router-dom";

export const PatientCard = (props) => {
  return (
    <>
      <div className="patientCard">
        <div className="patientCard-content">
          <div>
            {props.patient.first_name} {props.patient.last_name}
          </div>
          <button>
            <Link to={`/patients/${props.patient.id}`}>Details</Link>
          </button>
          <button>
            <Link to={`/patients/${props.patient.id}/edit`}>Edit</Link>
          </button>
        </div>
      </div>
    </>
  );
};
