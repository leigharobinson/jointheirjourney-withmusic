import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { Link } from "react-router-dom";
import SongListPatient from "../song/SongListPatient";
import "./Patient.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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

  // console.log(props.patientId);

  const getPatient = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("patients", props.patientId)
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

  const deleteObj = (type, id) => {
    ApiManager.destroy(type, id).then(() => props.history.push("/patients"));
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this patient?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteObj("patients", props.patientId),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <>
      <div id="Patient">
        <div className="PatientCard">
          <button>
            <Link to={`/patients/${patient.id}/edit`}>Edit</Link>
          </button>
          <div className="container">
            <button onClick={submit}>Delete</button>
          </div>

          <p>Caretaker: {patient.caretaker.user.first_name}</p>
          <p>
            Patient: {patient.first_name} {patient.last_name}
          </p>
          <p>Diagnosis: {patient.diagnosis}</p>
          <p>Year of Birth: {patient.year_of_birth}</p>
        </div>
        <SongListPatient {...props} />
      </div>
    </>
  );
};

export default PatientDetail;
