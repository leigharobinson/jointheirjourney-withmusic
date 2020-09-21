import React from "react";
import "../song/SongCard.css";
// import { Link } from "react-router-dom";

export const SongCard = (props) => {
  // console.log(props.patientId);

  return (
    <>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th scope="row">{props.song.position}</th>
            <td>"{props.song.song_title}"</td>
            <td>{props.song.artist}</td>
            <td>{props.song.year}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
