import React, { useRef, useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { SongCard } from "../song/SongCard";
import Button from "react-bootstrap/Button";
import "./SongCard.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export const SongList = (props) => {
  const year = useRef();
  const [songs, setSongs] = useState([]);
  const [songsByYear, setSongsByYear] = useState({});

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
  useEffect(() => {
    const songsByYear = {};
    songs.forEach((song) => {
      if (song.year in songsByYear) {
        songsByYear[song.year].push(song);
      } else {
        songsByYear[song.year] = [song];
      }
    });
    setSongsByYear(songsByYear);
  }, [songs]);

  return (
    <>
      <div className="SongList">
        <form className="select_year" onSubmit={handleSongSelection}>
          <h4>
            Select a Birth Year to Find Top Billboard Hits when 10 to 20 years
            of age.
          </h4>
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
              <Button type="submit">Submit</Button>
            </div>
            <Button onClick={() => setSongs([])} type="reset">
              Clear Search
            </Button>
          </fieldset>
        </form>
        <div>
          {Object.keys(songsByYear).map((year) => {
            return (
              <div key={year}>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        size="sm"
                        as={Button}
                        variant="outline-primary"
                        eventKey="0"
                      >
                        <h5>Year:{year}</h5>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        {songsByYear[year].map((song) => (
                          <SongCard key={song.id} song={song} />
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
