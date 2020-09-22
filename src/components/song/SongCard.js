import React from "react";
import "../song/SongCard.css";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

export const SongCard = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  // const song_title = props.song.song_title;
  // console.log(props);

  if (isAuthenticated == null) {
    return (
      <>
        <div className="SongCard">
          <h3>Rank: {props.song.position}</h3>
          <h3>id: {props.song.id}</h3>
          <h4>Song: "{props.song.song_title}"</h4>
          <h4>Artist: {props.song.artist}</h4>
          <h4>Year: {props.song.year}</h4>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="SongCard">
          <h3>Rank: {props.song.position}</h3>
          <h3>id: {props.song.id}</h3>
          <h4>
            Song: "
            <Link to={"/songresponses/form"} params={{ songId: props.song.id }}>
              {props.song.song_title}
            </Link>
            "
          </h4>
          <h4>Artist: {props.song.artist}</h4>
          <h4>Year: {props.song.year}</h4>
        </div>
      </>
    );
  }
};

{
  /* <Link
to={{
  pathname: "/songresponses/form",
  songProps: {
    song_title: "props.song.song_title",
    song_artist: "props.song.artist",
    song_id: "props.song.id",
    song_year: "props.song.year",
  },
}}
></Link> */
}

{
  /* <h4>
Song: "
<Link to={"/songresponses/form"} params={{ songId: props.song.id }}>
  {props.song.song_title}
</Link>
"
</h4> */
}
