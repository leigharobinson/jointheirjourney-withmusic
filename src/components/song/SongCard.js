import React from "react";
import "../song/SongCard.css";
// import { Link } from "react-router-dom";

export const SongCard = (props) => {
  // console.log(props.patientId);

  return (
    <>
      <table class="table table-striped">
        {/* <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Song</th>
            <th scope="col">Artist</th>
            <th scope="col">Year</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">{props.song.position}</th>
            <td>{props.song.song_title}</td>
            <td>{props.song.artist}</td>
            <td>{props.song.year}</td>
          </tr>
          {/* <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
      {/* <div className="SongCard">
        <h1>
          Song: {props.song.song_title} BY: {props.song.artist}
        </h1>
        <p>
          Rank: {props.song.position} year: {props.song.year}
        </p>
      </div> */}
    </>
  );
};
