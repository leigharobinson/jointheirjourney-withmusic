import React, { useState, useEffect } from "react";
// import { Button } from "reactstrap";
import { firstLetterCase } from "../Helpers";
// import "./SearchCard.css";

const SearchCard = (props) => {
  //card will keep track of any change to the input in the filter box
  const [word, setWord] = useState("");
  //filsterdispay will display the updated list based onthe search
  //its default state is our cards list prop <-- Joe changed this. See the useEffect below
  const [filteredDisplay, setFilteredDisplay] = useState([]);

  // Added this useEffect call to set filteredDisplay to props.allCards when the component mounts, instead of setting it in the useState method argument.
  useEffect(() => setFilteredDisplay(props.patients), [props.patients]);

  //handleChange runs each time ther's a change in the input feild
  const handleChange = (e) => {
    // we hold the original list in a new array and convert all the names to lowercase
    // we do this to take away chance of user input error
    // Then we return Old List as an arry of objects to hold this changed list
    let oldList = props.patients.map((filteredPatien) => {
      return {
        id: filteredPatien.id,
        first_name: filteredPatien.first_name.toLowerCase(),
        // cardType: filteredPatient.cardType,
        // expirationDate: filteredPatient.expirationDate,
        // amount: filteredPatient.amount,
        // discount: filteredPatient.discount,
        // visitsUntilReward: filteredPatient.visitsUntilReward,
      };
    });
    // if the input bar is not empty, run the following
    //esle if it's empty, setFilterDisplay to the original list prop
    if (e !== "") {
      let newList = [];

      //setCard keeps track of any changes in the input
      setWord(e);
      //newList is an array that holds the filteredCards that meet the search criteria.
      newList = oldList.filter((filteredPatient) =>
        // we call the includes method and pass in the 'word' state in lowercase
        //this checks if our oldList contains cards withthe 'word in its name
        filteredPatient.first_name.includes(word.toLowerCase())
      );
      setFilteredDisplay(newList);
    } else {
      // if the input isn't modified, return the roginal list.
      setFilteredDisplay(props.patients);
    }
  };
  return (
    <>
      <div>
        <div id="search_border">
          <h4 className="colorLetters">Patient Library:</h4>
          <input
            id="search_bar"
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {filteredDisplay.map((filteredPatient) => (
          <h3 className="colorLetters">
            <span className="card-for">
              {firstLetterCase(filteredPatient.first_name)}
            </span>
          </h3>
        ))}
        ;
      </div>
    </>
  );
};

export default SearchCard;
