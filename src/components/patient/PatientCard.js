import React from "react";
// import { Link } from "react-router-dom";

export const PatientCard = (props) => {
  return (
    <>
      <div className="patientCard">
        <div className="patientCard-content">
          <div>{props.patient.id}</div>
          <div>{props.patient.first_name}</div>
          <div>{props.patient.last_name}</div>
          <p>Diagnosis: {props.patient.diagnosis}</p>
          <h1>Year of Birth {props.patient.year_of_birth}</h1>
          <h2>Caretaker ID: {props.patient.caretaker_id} </h2>
        </div>
      </div>
    </>
  );
};
