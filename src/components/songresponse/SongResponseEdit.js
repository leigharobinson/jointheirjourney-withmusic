import React, { useEffect, useState, useRef } from "react";
import "./SongResponse.css";
import ApiManager from "../../modules/ApiManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Form from "react-bootstrap/Form";

export const SongResponseEdit = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  const [eyecontactVals, setEyeContactVals] = useState([]);
  const [talkativenessVals, setTalkativenessVals] = useState([]);
  const [vocalizationVals, setVocalizationVals] = useState([]);
  const [moodVals, setMoodVals] = useState([]);
  const [movementVals, setMovementVals] = useState([]);
  const [likedSongVals, setLikedSongVals] = useState([]);
  const [songresponse, setSongResponse] = useState({
    eye_contact: {},
    talkativeness: {},
    song: {},
    mood: {},
    movement: {},
    vocalization: {},
    liked_song: {},
    patient: {},
    notes: "",
  });

  const handleFieldChange = (e) => {
    const stateToChange = { ...songresponse };
    stateToChange[e.target.id] = e.target.value;
    setSongResponse(stateToChange);
  };

  const getMoodVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("moods").then(setMoodVals);
    }
  };
  useEffect(getMoodVals, []);
  // console.log(moodVals);

  const getTalkativenessVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("talkativeness").then(setTalkativenessVals);
    }
  };
  useEffect(getTalkativenessVals, []);
  // console.log(talkativenessVals);

  const getVocalizationVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("vocalizations").then(setVocalizationVals);
    }
  };
  useEffect(getVocalizationVals, []);
  // console.log(vocalizationVals);

  const getEyeContactVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("eyecontacts").then(setEyeContactVals);
    }
  };
  useEffect(getEyeContactVals, []);
  // console.log(eyecontactVals);

  const getMovmentVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("movements").then(setMovementVals);
    }
  };
  useEffect(getMovmentVals, []);
  // console.log(movementVals);

  const getLikedSongVals = () => {
    if (isAuthenticated()) {
      ApiManager.get("likedsongs").then(setLikedSongVals);
    }
  };
  useEffect(getLikedSongVals, []);
  // console.log(likedSongtVals);
  const getSongResponse = () => {
    if (isAuthenticated()) {
      ApiManager.getById("songresponses", props.responseId).then(
        (songresponse) => {
          setSongResponse(songresponse);
          //grabing caretaker herd to see what the Api call is giving back
          console.log(songresponse);
        }
      );
    }
  };

  const editSongResponse = (e) => {
    e.preventDefault();
    const updatedSongResponse = {
      id: songresponse.id,
      eye_contact_id: songresponse.eye_contact_id,
      talkativeness_id: songresponse.talkativeness_id,
      mood_id: songresponse.mood_id,
      movement_id: songresponse.movement_id,
      vocalization_id: songresponse.vocalization_id,
      liked_song_id: songresponse.liked_song_id,
      notes: songresponse.notes,
    };

    ApiManager.update("songresponses", updatedSongResponse).then(() => {
      props.changeFormTrue();
      props.getSongResponses();
      console.log("edited");
    });
  };

  useEffect(() => {
    getSongResponse();
  }, []);

  return (
    <>
      <h2>"{songresponse.song.song_title}"</h2>
      <h3>{songresponse.song.artist}</h3>
      <Form.Group>
        <br />
        <Form.Label>
          <strong>Eye Contact:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="eye_contact_id"
          id="eye_contact_id"
          value={songresponse.eye_contact_id}
        >
          {eyecontactVals.map((eye_contact) => (
            <option key={eye_contact.id} value={eye_contact.id}>
              {eye_contact.id}. {eye_contact.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>
          <strong>Talkativeness:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="talkativeness_id"
          id="talkativeness_id"
          value={songresponse.talkativeness_id}
        >
          {talkativenessVals.map((talkativeness) => (
            <option key={talkativeness.id} value={talkativeness.id}>
              {talkativeness.id}. {talkativeness.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>
          <strong>Mood:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="mood_id"
          id="mood_id"
          value={songresponse.mood_id}
        >
          {moodVals.map((mood) => (
            <option key={mood.id} value={mood.id}>
              {mood.id}. {mood.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>
          <strong>Movement</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="movement_id"
          id="movement_id"
          value={songresponse.movement_id}
        >
          {movementVals.map((movement) => (
            <option key={movement.id} value={movement.id}>
              {movement.id}. {movement.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>Vocalization Score</Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="vocalization_id"
          id="vocalization_id"
          value={songresponse.vocalization_id}
        >
          {vocalizationVals.map((vocalization) => (
            <option key={vocalization.id} value={vocalization.id}>
              {vocalization.id}. {vocalization.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>
          <strong>I think {props.patientName} liked this song.</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          onChange={handleFieldChange}
          type="select"
          name="liked_song_id"
          id="liked_song_id"
          value={songresponse.liked_song_id}
        >
          {likedSongVals.map((liked_song) => (
            <option key={liked_song.id} value={liked_song.id}>
              {liked_song.id}. {liked_song.description}
            </option>
          ))}
        </Form.Control>
        <br />
        <Form.Label>
          <strong>Notes:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          type="text"
          onChange={handleFieldChange}
          id="notes"
          defaultValue={songresponse.notes}
        />
        <br />
        <div className="alignRight">
          <button
            onClick={(e) => {
              editSongResponse(e);
            }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form.Group>
    </>
  );
};
