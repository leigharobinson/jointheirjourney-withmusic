import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
// import { Link } from "react-router-dom";

export const CaretakerDetail = (props) => {
  // let caretakerId = props.caretaker.id;
  const [caretaker, setCaretaker] = useState({
    user: {
      first_name: "",
    },
  });
  const { isAuthenticated } = useSimpleAuth();
  // console.log(props.patientId);

  const getCaretaker = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("caretakers", props.caretaker.id).then(setCaretaker);
      // product from API
      // .then((caretaker) => {
      //   // console.table(patient);
      //   // console.table(patient.caretaker);
      //   // THe .product_type has to match what's coming from API
      //   setCaretaker(caretaker);
    }
  };
  useEffect(getCaretaker, []);

  console.log(caretaker);

  return (
    <>
      <p>Caretaker's Details</p>
      <p>Name: {caretaker.user.first_name}</p>
    </>
  );
};
