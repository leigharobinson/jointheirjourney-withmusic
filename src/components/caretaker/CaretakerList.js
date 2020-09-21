import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
import ApiManager from "../../modules/ApiManager";
import "./Caretaker.css";

const CaretakerList = () => {
  const { isAuthenticated } = useSimpleAuth();
  const [caretaker, setCaretaker] = useState({
    user: {},
  });

  // Undefined

  const getCaretaker = () => {
    if (isAuthenticated()) {
      ApiManager.get("caretakers")
        //product from API
        .then((caretaker) => {
          setCaretaker(caretaker[0]);
          console.table(caretaker);
        });
    }
  };
  useEffect(() => {
    getCaretaker();
  }, []);

  return (
    <>
      <div>
        <Home />
      </div>
      <div className="CaretakerCard">
        <div>
          <div>
            <h3> Username: {caretaker.user.username}</h3>
          </div>
          <h5>Title: {caretaker.title}</h5>
          <h5>
            Name: {caretaker.user.first_name} {caretaker.user.last_name}
          </h5>
        </div>
      </div>
    </>
  );
};

export default CaretakerList;
