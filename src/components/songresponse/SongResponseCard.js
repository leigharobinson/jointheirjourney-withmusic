import React from "react";
import "./SongResponse.css";
// import { SongResponseDetail } from "../songresponse/SongResponseDetails";

export const SongResponseCard = (props) => {
  const dateCreated = props.songResponse.created_at;
  const songTitle = props.song;
  const artist = props.artist;
  // const eye_contact = props.eye_contact;
  // const talkativeness = props.talkativeness;
  // const mood = props.mood;
  // const movement = props.movement;
  // const vocalization = props.vocalization;
  // const liked_song = props.liked_song;
  // const notes = props.songResponse.notes;

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

  return (
    <>
      <div className="songResponseCard">
        {/* <p>Song Response Id: {props.songResponse.id}</p> */}
        <h4>
          <strong>Score: {totalScore}/36</strong>
        </h4>
        <h5>{dateCreated}</h5>
        <h5>
          <strong>"{songTitle}"</strong> by: {artist}
        </h5>
      </div>
      <div>
        {/* <SongResponseDetail
          {...props}
          dateCreated={dateCreated}
          songTitle={songTitle}
        /> */}
      </div>
    </>
  );
};
