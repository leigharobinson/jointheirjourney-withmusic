import React, { useState } from "react";
import "../song/SongCard.css";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import SongResponseForm from "../songresponse/SongResponseForm";

export const SongCard = (props) => {
  const { isAuthenticated } = useSimpleAuth();
  const [show, setShow] = useState(false);

  const patientId = props.patientId;
  // console.log(props.patientId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <div className="SongCard">
            <h3>Billboard Rank: {props.song.position}</h3>
            <h4> Song: "{props.song.song_title}"</h4>
            <h4>Artist: {props.song.artist}</h4>
            <h4>Year: {props.song.year}</h4>
            <Button variant="primary" onClick={handleShow}>
              Record Song Response
            </Button>
            <Modal show={show} onHide={handleClose}>
              <div id="modal_space"></div>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h1>Song Response Form</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SongResponseForm patientId={patientId} {...props} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="secondary" onClick={handleClose}>
                  Edit
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <>
          <div className="SongCard">
            <h3>Billboard Rank: {props.song.position}</h3>
            {/* <h3>id: {props.song.id}</h3> */}
            <h4>Song: "{props.song.song_title}"</h4>
            <h4>Artist: {props.song.artist}</h4>
            <h4>Year: {props.song.year}</h4>
          </div>
        </>
      )}
    </div>
  );
};
