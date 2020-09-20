import React, { useEffect, useState } from "react";
// import { CaretakerCard } from "./CaretakerCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
// import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";

const CaretakerList = () => {
  const [caretaker, setCaretaker] = useState({
    title: "",
    user: {
      first_name: "",
    },
  });
  const { isAuthenticated } = useSimpleAuth();

  // Undefined

  const getCaretaker = () => {
    if (isAuthenticated()) {
      ApiManager.get("caretakers")
        //product from API
        .then((caretaker) => {
          //   console.table(caretaker);
          //   console.log(caretaker[0].title);
          setCaretaker(caretaker);
          console.log(caretaker);
        });
    }
  };
  useEffect(getCaretaker, []);

  return (
    <>
      <div>
        <Home />
      </div>
      <div id="Caretaker">
        <div>
          <div>
            <p> Hello WOrld {caretaker.title}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaretakerList;
