import React, { useEffect, useState } from "react";
// import { CaretakerCard } from "./CaretakerCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Home } from "../home/Home";
// import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
import { CaretakerDetail } from "../caretaker/CaretakerDetail";

const CaretakerList = () => {
  const { isAuthenticated } = useSimpleAuth();
  const [caretaker, setCaretaker] = useState([
    {
      title: "",
      user: {
        first_name: "",
        last_name: "",
        username: "",
      },
    },
  ]);

  // Undefined

  const getCaretaker = () => {
    if (isAuthenticated()) {
      ApiManager.get("caretakers")
        //product from API
        .then(setCaretaker);
    }
    console.table(caretaker);
  };
  useEffect(() => {
    getCaretaker();
  }, []);

  let caretakerObj = caretaker.map((caretaker) => {
    return {
      id: caretaker.id,
      title: caretaker.title,
      first_name: caretaker.user.first_name,
      last_name: caretaker.user.last_name,
      user_name: caretaker.user.username,
    };
  });

  const first_name = caretakerObj[0].first_name;
  const last_name = caretakerObj[0].last_name;
  const username = caretakerObj[0].user_name;

  console.log(caretakerObj[0].id);
  console.log(caretakerObj[0].title);
  console.log(caretakerObj[0].first_name);
  console.log(caretakerObj[0].last_name);
  return (
    <>
      <div>
        <Home />
      </div>
      <div id="Caretaker">
        <div>
          <div>
            <p> Caretaker List </p>
            <h3>{username}</h3>
          </div>
          <h1>
            Name: {first_name} {last_name}
          </h1>
          <div>
            {/* <CaretakerDetail caretakerExpiriment={caretakerExpiriment} /> */}
            {/* {caretaker.map((caretaker) => (
              <CaretakerDetail
                key={`caretaker-${caretaker.id}`}
                caretaker={caretaker}
              />
            ))} */}
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
