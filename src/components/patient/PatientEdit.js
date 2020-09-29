import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { Home } from "../home/Home";

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
      id: props.patientId,
      caretakerId: patient.caretaker_id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      diagnosis: patient.diagnosis,
      year_of_birth: patient.year_of_birth,
    };

    ApiManager.update("patients", editedPatient).then(() =>
      props.history.push(`/patients/${editedPatient.id}`)
    );
  };

  const getPatient = () => {
    if (isAuthenticated()) {
      ApiManager.getById("patients", props.patientId).then((patient) => {
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
      <div>
        <Home />
      </div>
      <div className="bkg_color">
        <div className="PatientEdit">
          <h3 className="colorLetters">Edit Patient's Info:</h3>
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
        </div>
      </div>
    </>
  );
};

export default PatientEdit;
