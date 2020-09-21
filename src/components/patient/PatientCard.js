import React from "react";
import { Link } from "react-router-dom";
import "./Patient.css";
import { Button } from "reactstrap";

export const PatientCard = (props) => {
  return (
    <>
      <div className="PatientCard">
        <div className="patientCard-content">
          <button className="PatientBtn">
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
