import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
import ApiManager from "../../modules/ApiManager";
import "./Caretaker.css";
import Button from "react-bootstrap/Button";

const CaretakerList = (props) => {
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
          // console.table(caretaker);
        });
    }
  };
  useEffect(() => {
    getCaretaker();
  }, []);

  return (
    <>
      <div className="color_nav">
        <div>
          <Home />
        </div>
        <div className="CaretakerCard">
          <h3>
            Name: {caretaker.user.first_name} {caretaker.user.last_name}{" "}
          </h3>
          <h5>Title: {caretaker.title}</h5>
          <h5>Username: {caretaker.user.username}</h5>

          <Button
            onClick={() => {
              props.history.push(`/caretakers/edit/${caretaker.id}`);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CaretakerList;
