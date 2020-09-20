import React, { useRef, useState } from "react";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";
import { propTypes } from "react-bootstrap/esm/Image";

export const SongList = (props) => {
  const year = useRef();
  const [songs, setSongs] = useState([]);

  //   const { isAuthenticated } = useSimpleAuth();

  let year_range = [];

  for (let i = 1920; i <= 1970; i++) {
    year_range.push(i);
  }
  //   console.table(year_range);

  //Simplistic handler for year submit
  const handleSongSelection = (e) => {
    e.preventDefault();

    const selectedYear = {
      year: year.current.value,
    };

    // console.table(selectedYear);

    ApiManager.getByYear(selectedYear.year).then(setSongs);
  };

  // console.table(songs);

  return (
    <>
      <div>
        <form className="select_year" onSubmit={handleSongSelection}>
          <h1>
            Select Birth Year to Find Top Billboard Hits from 10 to 20 years of
            age.
          </h1>
          <fieldset>
            <select ref={year}>
              <option> Birth Year</option>
              {year_range.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <div className="alignRight">
              <button type="submit">Submit</button>
            </div>
            <button onClick={() => setSongs([])} type="reset">
              Clear Search
            </button>
          </fieldset>
        </form>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Song</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
          </table>

          {songs.map((song) => (
            <SongCard key={`song-${song.id}`} song={song} />
          ))}
        </div>
      </div>
    </>
  );
};
