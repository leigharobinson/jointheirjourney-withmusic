import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import "./Patient.css";

const PatientForm = (props) => {
  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    diagnosis: "",
    year_of_birth: "",
    // caretaker_id: props.caretaker_id,
    // caretaker_id: "",
  });
  const [caretaker, setCaretaker] = useState([]);
  const { isAuthenticated } = useSimpleAuth();

  const getCaretaker = () => {
    if (isAuthenticated()) {
      ApiManager.get("caretakers").then((caretaker) => {
        setCaretaker(caretaker);
      });
    }
  };
  // console.table(caretaker);
  useEffect(getCaretaker, []);

  const handleFieldChange = (evt) => {
    const stateToChange = { ...patient };
    stateToChange[evt.target.id] = evt.target.value;
    setPatient(stateToChange);
  };

  const constructNewPatient = (evt) => {
    evt.preventDefault();

    if (
      patient.first_name === "" ||
      patient.last_name === "" ||
      patient.diagnosis === "" ||
      patient.year_of_birth === ""
    ) {
      window.alert(
        "Please complete first name, last name, diagnosis, year of birth"
      );
    } else {
      const thePatient = {
        first_name: patient.first_name,
        last_name: patient.last_name,
        diagnosis: patient.diagnosis,
        year_of_birth: patient.year_of_birth,
        caretaker_id: parseInt(caretaker.id),
      };

      ApiManager.post("patients", thePatient).then(() => {
        // console.log("Added");
        props.history.push("/patients");
      });
    }
  };

  return (
    <>
      <div className="form_style">
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                onChange={handleFieldChange}
                id="first_name"
                placeholder="First Name"
                //   value={patient.first_name}
              />
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                required
                onChange={handleFieldChange}
                id="last_name"
                placeholder="Last Name"
                //   value={patient.last_name}
              />
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                required
                onChange={handleFieldChange}
                id="diagnosis"
                placeholder="Diagnosis:"
                //   value={patient.diagnosis}
              />
              <label htmlFor="diagnosis">Diagnosis:</label>
              <input
                type="text"
                required
                onChange={handleFieldChange}
                id="year_of_birth"
                placeholder="YYYY"
                //   value={patient.year_of_birth}
              />
              <label htmlFor="year_of_birth">Birth Year:</label>
            </div>
            <div className="alignRight">
              <button type="button" onClick={constructNewPatient}>
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default PatientForm;
