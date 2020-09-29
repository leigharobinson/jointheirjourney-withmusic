import React, { useState, useEffect } from "react";
import { firstLetterCase } from "../Helpers";
import { Link } from "react-router-dom";
import "./Patient.css";

const SearchCard = (props) => {
  //card will keep track of any change to the input in the filter box
  const [word, setWord] = useState("");
  //filsterdispay will display the updated list based onthe search
  //its default state is our patient's list prop See the useEffect below
  const [filteredDisplay, setFilteredDisplay] = useState([]);

  // Added this useEffect call to set filteredDisplay to props.patients when the component mounts, instead of setting it in the useState method argument.
  useEffect(() => setFilteredDisplay(props.patients), [props.patients]);

  //handleChange runs each time there's a change in the input feild
  const handleChange = (e) => {
    // we hold the original list in a new array and convert all the names to lowercase
    // we do this to take away chance of user input error
    // Then we return Old List as an arry of objects to hold this changed list
    let oldList = props.patients.map((filteredPatient) => {
      return {
        id: filteredPatient.id,
        first_name: filteredPatient.first_name.toLowerCase(),
        last_name: filteredPatient.last_name.toLowerCase(),
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
      // if the input isn't modified, return the orginal list.
      setFilteredDisplay(props.patients);
    }
  };
  return (
    <>
      <div>
        <div id="search_border">
          <h4 className="">Patient List:</h4>
          <input
            id="search_bar"
            placeholder="Search"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {filteredDisplay.map((filteredPatient, i) => (
          <div className="PatientCard" key={i}>
            <div className="patientCard-content">
              <Link to={`/patients/${filteredPatient.id}`}>
                <h4 className="">
                  <div className="patient_bx action_btn">
                    {firstLetterCase(filteredPatient.first_name)}{" "}
                    {firstLetterCase(filteredPatient.last_name)}
                  </div>
                </h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchCard;
