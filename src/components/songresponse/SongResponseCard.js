import React from "react";
import "./SongResponseCard.css";

export const SongResponseCard = (props) => {
  console.log(props);

  console.log(props.eye_contact);

  return (
    <>
      <div className="songResponseCard">
        <p>Song Response Id: {props.songResponse.id}</p>
        <p>Date Created: {props.songResponse.created_at}</p>
        {/* <p>Caretaker Name: {props.songResponse.caretaker.user.first_name}</p> */}
        {/* <p>Patient Name: {props.songResponse.patient.first_name}</p>
      <p>Song: {props.songResponse.song.song_title}</p>
      <p>Eye Contact: {props.songResponse.eyecontact.description}</p>
      <p>Talkativeness: {props.songResponse.talkativeness.description}</p>
      <p>Mood: {props.songResponse.mood.description}</p>
      <p>Movement: {props.songResponse.movement.description}</p>
      <p>Liked Song: {props.songResponse.liked_song.description}</p> */}
        <p>Eye Contact: {props.eye_contact}</p>
        <p>Notes: {props.songResponse.notes}</p>
      </div>
    </>
  );
};
