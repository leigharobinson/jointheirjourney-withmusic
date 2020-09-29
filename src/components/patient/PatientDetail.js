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
  const { isAuthenticated } = useSimpleAuth();
  const [patient, setPatient] = useState({
    first_name: "",
    caretaker: {
      id: "",
      user: {
        first_name: "",
      },
    },
  });
  const [songResponses, setSongResponses] = useState([
    {
      caretaker_id: "",
      patient_id: "",
      patient: {
        first_name: "",
        caretaker: {
          first_name: "",
        },
      },
      song_id: "",
      song: {
        id: "",
        song_title: "",
      },
      eye_contact_id: "",
      eye_contact: {
        description: "",
      },
      talkativeness_id: "",
      talkativeness: {
        description: "",
      },
      mood_id: "",
      mood: {
        description: "",
      },
      movement_id: "",
      movement: {
        description: "",
      },
      vocalization_id: "",
      vocalization: {
        description: "",
      },
      liked_song_id: "",
      liked_song: {
        description: "",
      },
    },
  ]);
  //Some Values to be passed to SongResonseList
  const patientId = props.patientId;
  // console.log(patientId);
  const caretakerId = patient.caretaker_id;
  // console.log(caretakerId);

  const getSongResponses = () => {
    if (isAuthenticated()) {
      ApiManager.getSongResponsesById(props.patientId).then((response) => {
        setSongResponses(response);
        // console.log(response);
      });
    }
  };

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
  useEffect(getSongResponses, []);

  //Use this to delete a patient and then return you to Patient List page
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
      <Home />
      <div className="bkg_color">
        <div id="Patient">
          <div className="PatientCard">
            <h3>
              Patient: {patient.first_name} {patient.last_name}
            </h3>
            {/* <h3>caretaker: {patient.caretaker_id}</h3> */}
            <p>Diagnosis: {patient.diagnosis}</p>
            <p>Year of Birth: {patient.year_of_birth}</p>
            <div className="Patient_btn">
              <Link to={`/patients/${patient.id}/edit`}>
                <Button>Edit</Button>
              </Link>

              <Button variant="danger" onClick={submit}>
                Delete
              </Button>
            </div>
          </div>
          <SongResponseList
            patientName={patient.first_name}
            patientId={patientId}
            caretakerId={caretakerId}
            songResponses={songResponses}
            getSongResponses={getSongResponses}
            {...props}
          />
          <SongListPatient
            patientId={patientId}
            caretakerId={caretakerId}
            getSongResponses={getSongResponses}
            {...props}
          />
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
