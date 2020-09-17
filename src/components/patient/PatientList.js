import React, { useEffect, useState } from "react";
import { PatientCard } from "./PatientCard";
import UseSimpleAuth from "../../hooks/ui/useSimpleAuth";

const PatientList = (props) => {
  const [patients, setPatients] = useState([]);
  const { isAuthenticated } = UseSimpleAuth();

  const getPatients = () => {
    if (isAuthenticated()) {
      fetch("http://localhost:8000/patients", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem(
            "musicmemoryapi_token"
          )}`,
        },
      })
        .then((res) => res.json())
        .then(setPatients);
    }
  };

  useEffect(getPatients, []);

  return (
    <div className="patientList">
      {patients.map((patient) => (
        <PatientCard key={`patient-${patient.id}`} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;
