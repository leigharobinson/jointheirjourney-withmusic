import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { Link } from "react-router-dom";

export const CaretakerDetail = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  let caretakerId = props.caretakerExpiriment[0].id;
  console.log(caretakerId);
  const [caretakerObj, setCaretakerObj] = useState({
    user: {
      first_name: "",
    },
  });
  // console.log(props.patientId);

  const getCaretakerObj = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("caretakers", caretakerId)
        // product from API
        .then((caretakerObj) => {
          // console.table(patient);
          // console.table(patient.caretaker);
          // THe .product_type has to match what's coming from API
          setCaretakerObj(caretakerObj);
        });
    }
  };
  useEffect(getCaretakerObj, []);

  // console.log(caretaker);

  return (
    <>
      <p>Caretaker's Details</p>
      <p>Name: {caretakerObj.user.first_name}</p>
    </>
  );
};
