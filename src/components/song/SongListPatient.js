import React, { useState, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";

import "./SongCard.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SongListPatient = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  const [songsByYear, setSongsByYear] = useState({});
  const [songs, setSongs] = useState([]);
  const [patient, setPatient] = useState([
    {
      first_name: "",
      caretaker: {
        id: "",
        user: {
          first_name: "",
        },
      },
    },
  ]);

  // used inheritance to get pass down caretaker id
  const caretakerId = props.caretakerId;
  // console.log(caretakerId);
  // got this value
  // console.log(props.patientId);

  const getPatientSongs = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("patients", props.patientId)
        // product from API
        .then((patient) => {
          // console.table(patient);
          // let i
          // console.table(patient[i].caretaker.user.id);
          // THe .product_type has to match what's coming from API
          setPatient(patient);
        });
      ApiManager.getSongsById(props.patientId).then((songs) => {
        setSongs(songs);
      });
    }
  };

  // console.table(songs);
  useEffect(getPatientSongs, []);
  useEffect(() => {
    const songsByYear = {};
    songs.forEach((song) => {
      if (song.year in songsByYear) {
        songsByYear[song.year].push(song);
      } else {
        songsByYear[song.year] = [song];
      }
    });
    setSongsByYear(songsByYear);
  }, [songs]);

  return (
    <>
      <div className="SongPatientList">
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <h3>Song Suggestions for {patient.first_name}</h3>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ textAlign: "center" }}>
                <div>
                  {Object.keys(songsByYear).map((year) => {
                    return (
                      <div key={year}>
                        <Accordion>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle
                                size="sm"
                                as={Button}
                                variant="outline-primary"
                                eventKey="0"
                              >
                                <h5>Year:{year}</h5>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                {songsByYear[year].map((song) => (
                                  <SongCard
                                    getSongResponses={props.getSongResponses}
                                    patientId={props.patientId}
                                    caretakerId={caretakerId}
                                    patientName={patient.first_name}
                                    {...props}
                                    key={song.id}
                                    song={song}
                                  />
                                ))}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </>
  );
};

export default SongListPatient;
