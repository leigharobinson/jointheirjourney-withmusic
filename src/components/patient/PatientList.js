import React, { useEffect, useState } from "react";
import { PatientCard } from "./PatientCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
import "./Patient.css";
import { Button } from "reactstrap";

const PatientList = (props) => {
  const [patients, setPatients] = useState([]);

  // Undefined
  // console.log(props.patientId);

  const { isAuthenticated } = useSimpleAuth();

  const getPatients = () => {
    if (isAuthenticated()) {
      ApiManager.get("patients").then(setPatients);
    }
  };

  useEffect(getPatients, []);

  return (
    <>
      <div>
        <Home />
      </div>
      <div className="PatientList">
        <h3>Patients:</h3>
        <div className="patientList">
          {patients.map((patient) => (
            <PatientCard key={`patient-${patient.id}`} patient={patient} />
          ))}
        </div>
        <div>
          <Link to={`/patients/form`}>
            <Button color="success">Create New patient</Button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default PatientList;
