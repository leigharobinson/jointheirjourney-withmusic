import React, { useRef, useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

const Songs = (props) => {
  const year = useRef();
  const [songs, setSongs] = useState([]);

  const { isAuthenticated } = useSimpleAuth();

  let year_range = [];

  for (let i = 1920; i <= 1970; i++) {
    year_range.push(i);
  }

  //Simplistic handler for year submit
  const handleSongSelection = (e) => {
    e.preventDefault();
  };

  const selectedYear = {
    year: year.current.value,
  };

  const getSongs = () => {
    if (isAuthenticated()) {
      //USed patient_year_of_birth to get songs
    } else {
      ApiManager.getByYear(selectedYear).then(setSongs);
    }
  };
  useEffect(getSongs, []);

  return (
    <>
      <div>
        <form className="select_year" onSubmit={handleSongSelection}>
          <h1>
            Select Birth Year to Find Top 5 songs from the ages of 10-20 years
            old
          </h1>
          <fieldset>
            <option value=""> Birth Year</option>
            {year_range.map((year) => (
              <option key={year} value={year}>
                Year
              </option>
            ))}
          </fieldset>
        </form>
      </div>
    </>
  );
};
