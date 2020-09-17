import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import PatientManager from "../../modules/PatientManager";

const PatientEdit = (props) => {
  const [patient, setPatient] = useState({
    first_name: "",
    caretaker: {
      user: {
        first_name: "",
      },
    },
  });
  const { isAuthenticated } = useSimpleAuth();

  const handleFieldChange = (evt) => {
    const stateToChange = { ...patient };
    stateToChange[evt.target.id] = evt.target.value;
    setPatient(stateToChange);
  };

  const updateExistingPatient = (evt) => {
    evt.preventDefault();

    //   This is an edit so we need the id
    const editedPatient = {
      id: props.match.params.patientId,
      caretakerId: patient.caretaker_id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      diagnosis: patient.diagnosis,
      year_of_birth: patient.year_of_birth,
    };

    PatientManager.update(editedPatient).then(() =>
      props.history.push("/patients")
    );
  };

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
          //   console.table(patient);
          //   console.table(patient.caretaker);
          // THe .product_type has to match what's coming from API
          setPatient(patient);
        });
    }
  };
  useEffect(getPatient, []);

  return (
    <>
      <h4 className="colorLetters">Edit Patient Info</h4>
      <form>
        <fieldset className="Patient_Form">
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="first_name"
              defaultValue={patient.first_name}
            />
            <label htmlFor="first_name">First Name:</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="last_name"
              defaultValue={patient.last_name}
            />
            <label htmlFor="last_name">Last Name:</label>

            <input
              type=""
              required
              onChange={handleFieldChange}
              id="diagnosis"
              defaultValue={patient.diagnosis}
            />
            <label htmlFor="diagnosis">Diagnosis:</label>

            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="year_of_birth"
              defaultValue={patient.year_of_birth}
            />
            <label htmlFor="year_of_birth">Year of Birth:</label>
          </div>
          <div className="alignRight">
            <button
              id="EditPatientBtn"
              type="button"
              onClick={updateExistingPatient}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default PatientEdit;
