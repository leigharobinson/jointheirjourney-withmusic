import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { Link } from "react-router-dom";
import SongListPatient from "../song/SongListPatient";
// import { SongListPatient } from "../song/SongYOBList";

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

  return (
    <>
      <div id="Patient">
        <button>
          <Link to={`/patients/${patient.id}/edit`}>Edit</Link>
        </button>
        {/* <button>
          <Link to={`/songs?patient_id=${props.patientId}`}>
            Song Suggestions
          </Link>
        </button> */}

        <p>Caretaker: {patient.caretaker.user.first_name}</p>
        <p>
          Patient: {patient.first_name} {patient.last_name}
        </p>
        <p>Diagnosis: {patient.diagnosis}</p>
        <p>Year of Birth: {patient.year_of_birth}</p>

        <SongListPatient {...props} />
      </div>
    </>
  );
};

export default PatientDetail;
