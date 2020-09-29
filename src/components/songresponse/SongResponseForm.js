import React, { useState, useRef, useEffect } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import Form from "react-bootstrap/Form";

const SongResponseForm = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  const [eyecontactVals, setEyeContactVals] = useState([]);
  const [talkativenessVals, setTalkativenessVals] = useState([]);
  const [vocalizationVals, setVocalizationVals] = useState([]);
  const [moodVals, setMoodVals] = useState([]);
  const [movementVals, setMovementVals] = useState([]);
  const [likedSongVals, setLikedSongVals] = useState([]);

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

  const constructNewSongResponse = (e) => {
    e.preventDefault();

    if (
      eye_contact.current.value === "" ||
      talkativeness.current.value === "" ||
      mood.current.value === "" ||
      movement.current.value === "" ||
      vocalization.current.value === "" ||
      liked_song.current.value === ""
    ) {
      window.alert(
        "Please select Eye Contact, Talkativeness, Mood, Vocalization values as well as a value for how much you thought the patient enjoyed the song."
      );
    } else {
      const newSongResponse = {
        // They key portion has to match what I called them in the Api
        // The Value has to match what I called them in my useRef or props
        song_id: props.song.id,
        caretaker_id: props.caretakerId,
        patient_id: props.patientId,
        eye_contact_id: eye_contact.current.value,
        talkativeness_id: talkativeness.current.value,
        mood_id: mood.current.value,
        movement_id: movement.current.value,
        vocalization_id: vocalization.current.value,
        liked_song_id: liked_song.current.value,
        notes: notes.current.value,
      };

      // console.log(newSongResponse);
      ApiManager.post("songresponses", newSongResponse).then(() => {
        console.log("Added");
        props.handleClose();
        props.getSongResponses();
        //just checking but knew this value would prob be undefined
        // props.history.push(`/patients/${props.patientId}`);
      });
    }
  };

  // Had to make sure I was getting the spread opperatorl
  // console.log(props.history);

  return (
    <>
      <h5>"{songName}"</h5>
      <h6>{songArtist}</h6>
      <Form.Group>
        <br />
        <Form.Label>
          <strong>Eye Contact:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="eye_contact"
          id="eye_contact"
          ref={eye_contact}
        >
          {eyecontactVals.map((eye_contact) => (
            <option key={eye_contact.id} value={eye_contact.id}>
              {eye_contact.id}. {eye_contact.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Talkativeness:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="talkativeness"
          id="talkativeness"
          ref={talkativeness}
        >
          {talkativenessVals.map((talkativeness) => (
            <option key={talkativeness.id} value={talkativeness.id}>
              {talkativeness.id}. {talkativeness.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Vocalization:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="vocalization"
          id="vocalization"
          ref={vocalization}
        >
          {vocalizationVals.map((vocalization) => (
            <option key={vocalization.id} value={vocalization.id}>
              {vocalization.id}. {vocalization.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Mood:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="mood"
          id="mood"
          ref={mood}
        >
          {moodVals.map((mood) => (
            <option key={mood.id} value={mood.id}>
              {mood.id}. {mood.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Movement:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="movement"
          id="movement"
          ref={movement}
        >
          {movementVals.map((movement) => (
            <option key={movement.id} value={movement.id}>
              {movement.id}. {movement.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Did {props.patientName} like this song?</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          as="select"
          type="select"
          name="liked_song"
          id="liked_song"
          ref={liked_song}
        >
          {likedSongVals.map((liked_song) => (
            <option key={liked_song.id} value={liked_song.id}>
              {liked_song.id}. {liked_song.description}
            </option>
          ))}
        </Form.Control>
        <Form.Label>
          <strong>Notes:</strong>
        </Form.Label>
        <Form.Control
          size="sm"
          placeholder="Add Notes Here"
          required
          autoFocus
          type="text"
          ref={notes}
          id="notes"
        />
        <div className="alignRight">
          <button type="button" onClick={constructNewSongResponse}>
            Submit
          </button>
        </div>
      </Form.Group>
    </>
  );
};

export default SongResponseForm;
