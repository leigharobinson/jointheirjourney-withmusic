import React, { useEffect, useState, useRef } from "react";
import "./SongResponse.css";
import ApiManager from "../../modules/ApiManager";

export const SongResponseDetail = (props) => {
  console.log(props.responseId);
  const [songresponse, setSongResponse] = useState({
    eye_contact: {},
    talkativeness: {},
    mood: {},
    movement: {},
    vocalization: {},
    liked_song: {},
    notes: "",
  });

  const getSongResponse = () => {
    ApiManager.getById("songresponses", props.responseId).then(
      (songResponse) => {
        setSongResponse(songresponse[0]);
        //grabing caretaker her to see what the Api call is giving back
        console.log(songresponse);
      }
    );
  };

  useEffect(() => {
    getSongResponse();
  }, []);

  return (
    <>
      <div>
        <h4>
          {" "}
          {props.dateCreated}
          {songresponse.song.artist}
        </h4>
        <h5>
          <strong>"{props.songTitle}"</strong> by: {props.artist}
          <hr />
          <div className="Parent">
            <p>
              <strong>Eye Contact:</strong> {props.eye_contact}
            </p>
            <p>{props.eye_contact_score}/5 </p>
          </div>
          <div className="Parent">
            <p>
              <strong>Talkativeness:</strong> {props.talkativeness}
            </p>
            <p> {props.talkativeness_score}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Mood:</strong> {props.mood}
            </p>
            <p>{props.mood_score}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Movement:</strong> {props.movement}
            </p>
            <p>{props.movement_score}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Vocalization:</strong> {props.vocalization}
            </p>
            <p>{props.vocalization_score}/5</p>
          </div>
          <div className="Parent">
            <p>
              <strong>Liked Song:</strong> {props.liked_song}
            </p>
            <p>{props.liked_song_score}/5</p>
          </div>
          <div className="Parent">
            <h4>
              <strong> Score:</strong>
            </h4>
            <h4>
              <strong>{props.totalScore}/36</strong>
            </h4>
          </div>
        </h5>
      </div>
    </>
  );
};
