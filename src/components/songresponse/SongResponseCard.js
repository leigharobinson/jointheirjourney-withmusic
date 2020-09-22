import React, { useState } from "react";
import "./SongResponse.css";
import { SongResponseDetail } from "../songresponse/SongResponseDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ApiManager from "../../modules/ApiManager";
import "./SongResponse.css";

export const SongResponseCard = (props) => {
  const [show, setShow] = useState(false);

  const dateCreated = props.songResponse.created_at;
  const songTitle = props.song;
  const artist = props.artist;
  const eye_contact = props.eye_contact;
  const talkativeness = props.talkativeness;
  const mood = props.mood;
  const movement = props.movement;
  const vocalization = props.vocalization;
  const liked_song = props.liked_song;
  const notes = props.songResponse.notes;

  const eye_contact_score = parseInt(props.eye_contact_id);
  const talkativeness_score = parseInt(props.talkativeness_id);
  const mood_score = parseInt(props.mood_id);
  const movement_score = parseInt(props.movement_id);
  const vocalization_score = parseInt(props.vocalization_id);
  const liked_song_score = parseInt(props.liked_song_id);

  const totalScore =
    eye_contact_score +
    talkativeness_score +
    mood_score +
    movement_score +
    vocalization_score +
    liked_song_score;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSongResponse = () => {
    ApiManager.destroy("songresponses", props.songResponse.id)
      .then(handleClose())
      .then(props.getSongResponses());
  };

  return (
    <>
      <div className="songResponseCard">
        <h4>
          <strong>Score: {totalScore}/36</strong>
        </h4>
        <h5>{dateCreated}</h5>
        <h5>
          <strong>"{songTitle}"</strong> by: {artist}
        </h5>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Details
          </Button>
          <Modal show={show} onHide={handleClose}>
            <div id="modal_space"></div>
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Song Response Details</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SongResponseDetail
                {...props}
                totalScore={totalScore}
                dateCreated={dateCreated}
                songTitle={songTitle}
                eye_contact={eye_contact}
                eye_contact_score={eye_contact_score}
                talkativeness={talkativeness}
                talkativeness_score={talkativeness_score}
                mood={mood}
                mood_score={mood_score}
                movement={movement}
                movement_score={movement_score}
                vocalization={vocalization}
                vocalization_score={vocalization_score}
                liked_song={liked_song}
                liked_song_score={liked_song_score}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Edit
              </Button>
              <Button variant="danger" onClick={deleteSongResponse}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
