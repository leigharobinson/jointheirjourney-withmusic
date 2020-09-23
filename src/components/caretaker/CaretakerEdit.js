import React, { useEffect, useState, useRef } from "react";

import { Home } from "../home/Home";
import ApiManager from "../../modules/ApiManager";
import "./Caretaker.css";

export const CaretakerEdit = (props) => {
  console.log(props.caretakerId);

  const [caretaker, setCaretaker] = useState({
    user: {},
  });
  const firstName = useRef();
  const lastName = useRef();
  const title = useRef();
  const username = useRef();

  //   console.log(caretaker.user.id);
  const getCaretaker = () => {
    ApiManager.get("caretakers").then((caretaker) => {
      setCaretaker(caretaker[0]);
      //grabing caretaker her to see what the Api call is giving back
      // console.table(caretaker);
    });
  };

  const editCaretaker = (e) => {
    e.preventDefault();
    const updatedCaretaker = {
      id: caretaker.id,
      title: title.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      username: username.current.value,
    };
    ApiManager.update("caretakers", updatedCaretaker).then(
      props.history.push(`/caretakers`)
    );
  };

  useEffect(getCaretaker, []);

  return (
    <>
      <div>
        <Home />
      </div>
      <div className="CaretakerCard">
        <form onSubmit={editCaretaker} className="col-8 offset-2 text-left">
          <div className="form-group">
            <label htmlFor="firstName">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              ref={firstName}
              defaultValue={caretaker.user.first_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              ref={lastName}
              defaultValue={caretaker.user.last_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              ref={title}
              defaultValue={caretaker.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="usernamer">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              ref={username}
              defaultValue={caretaker.user.username}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
        <button
          onClick={() => {
            props.history.push(`/caretakers`);
          }}
        >
          Back to Profile
        </button>
      </div>
    </>
  );
};
