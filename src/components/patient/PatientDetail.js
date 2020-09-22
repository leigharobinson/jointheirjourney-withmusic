import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { Link } from "react-router-dom";
import SongListPatient from "../song/SongListPatient";
import "./Patient.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SongResponseList from "../songresponse/SongResponseList";
import { Home } from "../home/Home";
import Button from "react-bootstrap/Button";

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

  const patientId = props.patientId;
  // console.log(patientId);

  const getPatient = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("patients", patientId)
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
        <Home />
        <div className="PatientCard">
          <p>
            Patient: {patient.first_name} {patient.last_name}
          </p>
          <p>Diagnosis: {patient.diagnosis}</p>
          <p>Year of Birth: {patient.year_of_birth}</p>
          <div className="Patient_btn">
            <Button>
              <Link to={`/patients/${patient.id}/edit`}>Edit</Link>
            </Button>
            <Button color="danger" onClick={submit}>
              Delete
            </Button>
          </div>
        </div>
        <SongResponseList
          patientName={patient.first_name}
          patientId={patientId}
          {...props}
        />
        <SongListPatient {...props} />
      </div>
    </>
  );
};

export default PatientDetail;
