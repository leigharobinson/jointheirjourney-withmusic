import React, { useRef, useState } from "react";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";

export const SongList = () => {
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

    console.table(selectedYear);

    ApiManager.getByYear(selectedYear.year).then(setSongs);
  };

  return (
    <>
      <div>
        <form className="select_year" onSubmit={handleSongSelection}>
          <h1>
            Select Birth Year to Find Top 5 songs from the ages of 10-20 years
            old
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
          </fieldset>
        </form>
        <div>
          {songs.map((song) => (
            <SongCard key={`song-${song.id}`} song={song} />
          ))}
        </div>
      </div>
    </>
  );
};
