import React, { useEffect, useState } from "react";
// import { CaretakerCard } from "./CaretakerCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
// import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
import { CaretakerDetail } from "../caretaker/CaretakerDetail";

const CaretakerList = () => {
  const [caretaker, setCaretaker] = useState([
    {
      caretaker: {
        user: {
          first_name: "",
        },
      },
    },
  ]);
  const { isAuthenticated } = useSimpleAuth();

  // Undefined

  const getCaretaker = () => {
    if (isAuthenticated()) {
      ApiManager.get("caretakers")
        //product from API
        .then(setCaretaker);
    }
    console.table(caretaker);
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
            <p> Caretaker List </p>
          </div>
          <div>
            {caretaker.map((caretaker) => (
              <CaretakerDetail
                key={`caretaker-${caretaker.id}`}
                caretaker={caretaker}
              />
            ))}
          </div>

          {/* <div>
            {caretaker.map((caretaker) => (
              <CaretakerCard
                key={`caretaker-${caretaker.id}`}
                caretaker={caretaker}
              />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CaretakerList;
