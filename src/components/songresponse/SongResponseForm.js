import React, { useState, useRef, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";

const SongResponseForm = (props) => {
  console.log(props);
  const { isAuthenticated } = useSimpleAuth();

  const [eyecontactVals, setEyeContactVals] = useState([]);

  const [talkativenessVals, setTalkativenessVals] = useState([]);

  // [vocalization_vals, setVocalizationVals] = useState([]);

  const [moodVals, setMoodVals] = useState([]);
  // [movement_vals, setMovementVals] = useState([]);
  // [likedsong_vals, setLikedSongVals] = useState([]);
  //inherited song properties
  // const song = props.song.id;
  // console.log(song);
  // const patient = props.patientId;
  // console.log(patient);
  // const caretaker = props.caretakerId;
  const songName = props.song.song_title;
  const songArtist = props.song.artist;
  ///created mesurment placeholders
  const eye_contact = useRef();
  const talkativeness = useRef();
  const mood = useRef();
  const movement = useRef();
  const vocalization = useRef();
  const liked_song = useRef();
  const notes = useRef();

  const getMoodVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("moods").then(setMoodVals);
    }
  };
  useEffect(getMoodVals, []);
  console.log(moodVals);

  const getTalkativenessVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("talkativeness").then(setTalkativenessVals);
    }
  };
  useEffect(getTalkativenessVals, []);
  console.log(talkativenessVals);

  const getEyeContactVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("eyecontacts").then(setEyeContactVals);
    }
  };
  useEffect(getEyeContactVals, []);
  console.log(eyecontactVals);

  const constructNewSongResponse = (e) => {
    e.preventDefault();

    const newSongResponse = {
      song_id: props.song.id,
      caretaker_id: props.caretakerId,
      patient_id: props.patientId,
      // eye_contact: eye_contact.current.value,
      // talkativeness: talkativeness.current.value,
      mood_id: mood.current.value,
      // movement: movement.current.value,
      // vocalization: vocalization.current.value,
      // liked_song: liked_song.current.value,
      // notes: notes.current.value,
    };

    console.log(newSongResponse);
    ApiManager.post("songresponses", newSongResponse).then(() => {
      console.log("Added");
      props.histroy.push("/patients/" + props.patientId);
    });
  };

  return (
    <>
      <h2>"{songName}"</h2>
      <h3>{songArtist}</h3>
      <div className="SongResponseForm">
        <form>
          <fieldset>
            <div>
              <select ref={mood} id="mood">
                <option value="">Mood Category</option>
                {moodVals.map((mood) => (
                  <option key={mood.id} value={mood.id}>
                    {mood.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="alignRight">
              <button type="button" onClick={constructNewSongResponse}>
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default SongResponseForm;
