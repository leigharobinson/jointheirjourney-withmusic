import React, { useEffect, useState } from "react";
import { SongResponseCard } from "./SongResponseCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
// import { Home } from "../home/Home";
// import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
// import "./Patient.css";
import { Button } from "reactstrap";
import { SongCard } from "../song/SongCard";

const SongResponseList = (props) => {
  const [songResponses, setSongResponses] = useState([
    {
      caretaker_id: "",
      patient_id: "",
      patient: {
        first_name: "",
        caretaker: {
          first_name: "",
        },
      },
      song_id: "",
      song: {
        song_title: "",
      },
      eye_contact_id: "",
      eye_contact: {
        description: "",
      },
      talkativeness: {
        description: "",
      },
      mood: {
        description: "",
      },
      movememnt: {
        description: "",
      },
    },
  ]);

  // Undefined
  // console.log(props.patientId);

  const { isAuthenticated } = useSimpleAuth();

  const getSongResponses = () => {
    if (isAuthenticated()) {
      ApiManager.getSongResponsesById(props.patientId).then((response) => {
        setSongResponses(response);
        console.log(response);
      });
    }
  };

  useEffect(getSongResponses, []);

  return (
    <>
      <div className="responseList">
        {songResponses.map((response) => (
          <SongResponseCard
            key={`response-${response.id}`}
            songResponse={response}
            eye_contact={response.eye_contact.description}
          />
        ))}
      </div>
    </>
  );
};

export default SongResponseList;
