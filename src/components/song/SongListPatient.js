import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";
import { Collapse, Button, CardBody, Card } from "reactstrap";

const SongListPatient = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [patient, setPatient] = useState({
    first_name: "",
    caretaker: {
      user: {
        first_name: "",
      },
    },
  });
  const { isAuthenticated } = useSimpleAuth();

  const toggle = () => setIsOpen(!isOpen);
  // console.log(props.patientId);

  const getPatientSongs = () => {
    if (isAuthenticated()) {
      // passing('patients', patient.id) also works
      ApiManager.getById("patients", props.patientId)
        // product from API
        .then((patient) => {
          // console.table(patient);
          // console.table(patient.caretaker);
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

  return (
    <>
      <div>
        <div>
          <Button
            color="primary"
            onClick={toggle}
            style={{ marginBottom: "1rem" }}
          >
            <h3>Song Suggestions for {patient.first_name}</h3>
          </Button>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Song</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Year</th>
                      </tr>
                    </thead>
                  </table>
                  {songs.map((song) => (
                    <SongCard key={`song-${song.id}`} song={song} />
                  ))}
                </div>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default SongListPatient;
