import React, { useEffect, useState } from "react";
import { SongResponseCard } from "./SongResponseCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import "./SongResponse.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
        id: "",
        song_title: "",
      },
      eye_contact_id: "",
      eye_contact: {
        description: "",
      },
      talkativeness_id: "",
      talkativeness: {
        description: "",
      },
      mood_id: "",
      mood: {
        description: "",
      },
      movement_id: "",
      movement: {
        description: "",
      },
      vocalization_id: "",
      vocalization: {
        description: "",
      },
      liked_song_id: "",
      liked_song: {
        description: "",
      },
    },
  ]);

  const { isAuthenticated } = useSimpleAuth();

  const getSongResponses = () => {
    if (isAuthenticated()) {
      ApiManager.getSongResponsesById(props.patientId).then((response) => {
        setSongResponses(response);
        // console.log(response);
      });
    }
  };

  useEffect(getSongResponses, []);

  return (
    <>
      <div className="SongResponseList">
        <div>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h3>{props.patientName}'s Song Responses</h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {songResponses.map((response) => (
                    <SongResponseCard
                      key={`response-${response.id}`}
                      songResponse={response}
                      song={response.song.song_title}
                      artist={response.song.artist}
                      eye_contact={response.eye_contact.description}
                      eye_contact_id={response.eye_contact_id}
                      talkativeness={response.talkativeness.description}
                      talkativeness_id={response.talkativeness_id}
                      mood={response.mood.description}
                      mood_id={response.mood_id}
                      movement={response.movement.description}
                      movement_id={response.movement_id}
                      vocalization={response.vocalization.description}
                      vocalization_id={response.vocalization_id}
                      liked_song={response.liked_song.description}
                      liked_song_id={response.liked_song_id}
                      getSongResponses={getSongResponses}
                      {...props}
                    />
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SongResponseList;
