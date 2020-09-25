import React from "react";
import { Link } from "react-router-dom";
import "./Patient.css";
// import Button from "react-bootstrap/Button";
// import Button from "react-bootstrap/Button";

export const PatientCard = (props) => {
  return (
    <>
      <div className="PatientCard ">
        <div className="patientCard-content">
          <Link to={`/patients/${props.patient.id}`}>
            <div className="patient_bx action_btn">
              <h4>
                {props.patient.first_name} {props.patient.last_name}
              </h4>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
