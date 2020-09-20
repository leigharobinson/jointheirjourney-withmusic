import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";

const SongListPatient = (props) => {
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
        <h1>{patient.first_name}'s Song Suggestions</h1>
        <div>
          <table class="table table-striped">
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
      </div>
    </>
  );
};

export default SongListPatient;
