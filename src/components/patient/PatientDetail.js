import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const PatientDetail = (props) => {
  const [patient, setPatient] = useState({
    first_name: "",
    caretaker: {
      user: {
        first_name: "",
      },
    },
  });
  const { isAuthenticated } = useSimpleAuth();

  const getPatient = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/patients/${props.patientId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem(
            "musicmemoryapi_token"
          )}`,
        },
      })
        .then((response) => response.json())
        // product from API
        .then((patient) => {
          // console.table(patient);
          // console.table(patient.caretaker);
          // THe .product_type has to match what's coming from API
          setPatient(patient);
        });
    }
  };
  useEffect(getPatient, []);

  return (
    <>
      <p>Caretaker: {patient.caretaker.user.first_name}</p>
      <p>
        Patient: {patient.first_name} {patient.last_name}
      </p>
      <p>Diagnosis: {patient.diagnosis}</p>
      <p>Year of Birth: {patient.year_of_birth}</p>

      <button>View Song Responses</button>
      <button>View Generated Songs list</button>
    </>
  );
};

export default PatientDetail;
