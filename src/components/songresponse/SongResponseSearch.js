import React, { useState, useEffect } from "react";
import { firstLetterCase } from "../Helpers";
// import { Link } from "react-router-dom";

const SongResponseSearch = (props) => {
  const [filteredDisplay, setFilteredDisplay] = useState([]);

  // Added this useEffect call to set filteredDisplay to props.patients when the component mounts, instead of setting it in the useState method argument.
  useEffect(() => setFilteredDisplay(props.songResponses), [
    props.songResponses,
  ]);

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
        totalScore: filteredSongResponse.total,
      };
    });

    // if the input bar is not empty, run the following
    //esle if it's empty, setFilterDisplay to the original list prop
    if (e !== "") {
      let newList = [];
      // let word = firstLetterCase(e);
      console.log("did we enter if?");
      console.log(e.toLowerCase());
      console.log(firstLetterCase(e));
      //setCard keeps track of any changes in the input

      //newList is an array that holds the filteredCards that meet the search criteria.

      newList = oldList.filter((filteredSongResponse) =>
        // we call the includes method and pass in the 'word' state in lowercase
        //this checks if our oldList contains cards with the 'word in its name

        filteredSongResponse.song_title.includes(e.toLowerCase())
      );
      setFilteredDisplay(newList);
      console.log("New List", newList);
    } else {
      // if the input isn't modified, return the orginal list.
      console.log("did we enter else?");
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
          <div className="" key={i}>
            {!filteredSongResponse.song_title ? (
              <div>
                <h5>{filteredSongResponse.created_at}</h5>
                <h4 className="">
                  {filteredSongResponse.song.song_title}{" "}
                  {filteredSongResponse.total}/30
                </h4>
              </div>
            ) : (
              <div>
                <h5>{filteredSongResponse.created_at}</h5>
                <h4 className="">
                  {firstLetterCase(filteredSongResponse.song_title)}{" "}
                  {filteredSongResponse.totalScore}/30
                </h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SongResponseSearch;
