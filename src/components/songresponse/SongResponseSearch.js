import React, { useState, useEffect } from "react";
import "./SongResponse.css";
import { SongResponseCard } from "./SongResponseCard";
import { SongResponseCardUnfiltered } from "./SongResponseCardUnfiltered";

const SongResponseSearch = (props) => {
  const [filteredDisplay, setFilteredDisplay] = useState([]);

  // Added this useEffect call to set filteredDisplay to props.songResponses when the component mounts, instead of setting it in the useState method argument.
  useEffect(() => setFilteredDisplay(props.songResponses), [
    props.songResponses,
  ]);

  // Here I'm trying to state to True so that I can see it is True and return something different on Song
  // Response DetailsDetails

  //handleChange runs each time there's a change in the input feild
  const handleChange = (e) => {
    // we hold the original list in a new array and convert all the names to lowercase
    // we do this to take away chance of user input error
    // Then we return Old List as an arry of objects to hold this changed list
    let oldList = props.songResponses.map((filteredSongResponse) => {
      return {
        id: filteredSongResponse.id,
        created_at: filteredSongResponse.created_at,
        song_title: filteredSongResponse.song.song_title.toLowerCase(),
        artist: filteredSongResponse.song.artist,
        total: filteredSongResponse.total,
      };
    });

    // if the input bar is not empty, run the following
    //esle if it's empty, setFilterDisplay to the original list prop
    if (e !== "") {
      let newList = [];

      //newList is an array that holds the filteredCards that meet the search criteria.

      newList = oldList.filter((filteredSongResponse) =>
        // we call the includes method and pass in the 'word' state in lowercase
        //this checks if our oldList contains cards with the 'word in its name

        filteredSongResponse.song_title.includes(e.toLowerCase())
      );
      setFilteredDisplay(newList);
    } else {
      // if the input isn't modified, return the orginal list.

      setFilteredDisplay(props.songResponses);
    }
  };

  // if (filteredDisplay.length == props.songResponses.length) {
  return (
    <>
      <div>
        <div id="search_border">
          <h4 className="colorLetters">Search Responses:</h4>
          <input
            id="search_bar"
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {filteredDisplay.map((filteredSongResponse, i) => (
          <div key={i}>
            {!filteredSongResponse.song_title ? (
              <div className="unfiltered_card">
                <SongResponseCardUnfiltered
                  getSongResponses={props.getSongResponses}
                  songResponses={props.songResponses}
                  key={`filteredSongResponse-${filteredSongResponse.id}`}
                  filteredSongResponse={filteredSongResponse}
                  {...props}
                />
              </div>
            ) : (
              <div className="filtered_card">
                <SongResponseCard
                  getSongResponses={props.getSongResponses}
                  key={`filteredSongResponse-${filteredSongResponse.id}`}
                  filteredSongResponse={filteredSongResponse}
                  songResponses={props.songResponses}
                  patientName={props.patientName}
                  {...props}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SongResponseSearch;
