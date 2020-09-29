import React, { useEffect, useState } from "react";
import { PatientCard } from "./PatientCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
import "./Patient.css";
import Button from "react-bootstrap/Button";
import SearchCard from "./SearchCard";

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
      <div className="bkg_color">
        <div>
          <Home />
        </div>
        <div>
          <SearchCard patients={patients} {...props} />
        </div>
        <div className="PatientList">
          <div className="CreateNew_btn">
            <Link to={`/patients/form`}>
              <Button color="success">Create New patient</Button>{" "}
            </Link>
          </div>
          <div className="Title_position">
            <h3>Patient List</h3>
          </div>

          <div className="patientList">
            {patients.map((patient) => (
              <PatientCard key={`patient-${patient.id}`} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientList;
