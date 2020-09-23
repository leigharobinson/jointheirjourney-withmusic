import React, { useEffect, useState, useRef } from "react";
import "./SongResponse.css";
import ApiManager from "../../modules/ApiManager";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { SongResponseEdit } from "../songresponse/SongResponseEdit";

export const SongResponseDetail = (props) => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSimpleAuth();
  const [songresponse, setSongResponse] = useState({
    eye_contact: {},
    talkativeness: {},
    song: {},
    mood: {},
    movement: {},
    vocalization: {},
    liked_song: {},
    notes: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    getSongResponse();
  }, []);

  return (
    <>
      <div>
        {/* <h4>{songresponse.id}</h4> */}
        <h4>{songresponse.created_at}</h4>
        <h5>
          <strong>"{songresponse.song.song_title}"</strong> by:
          {songresponse.song.artist}
          <hr />
          <div className="Parent">
            <p>
              <strong>Eye Contact:</strong>
              {songresponse.eye_contact.description}
            </p>
            <p>{songresponse.eye_contact_id}/5 </p>
          </div>
          <div className="Parent">
            <p>
              <strong>Talkativeness:</strong>{" "}
              {songresponse.talkativeness.description}
            </p>
            <p> {songresponse.talkativeness_id}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Mood:</strong> {songresponse.mood.description}
            </p>
            <p>{songresponse.mood_id}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Movement:</strong> {songresponse.movement.description}
            </p>
            <p>{songresponse.movement_id}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Vocalization:</strong>{" "}
              {songresponse.vocalization.description}
            </p>
            <p>{songresponse.vocalization_id}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Liked Song:</strong> {songresponse.liked_song.description}
            </p>
            <p>{songresponse.liked_song_id}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Notes:</strong> {songresponse.notes}
            </p>
          </div>
          <div className="Parent">
            <h4>
              <strong> Score:</strong>
            </h4>
            <h4>
              <strong>{props.totalScore}/30</strong>
            </h4>
          </div>
        </h5>
      </div>
    </>
  );
};
