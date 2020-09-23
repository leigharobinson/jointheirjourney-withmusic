import React, { useState } from "react";
import "../song/SongCard.css";
// import { Link } from "react-router-dom";
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
            <h6>{props.song.year}</h6>
            <h6>Billboard Rank: {props.song.position}</h6>
            <h6>
              Song:<strong> "{props.song.song_title}"</strong>
            </h6>
            <h6>Artist: {props.song.artist}</h6>
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
                <SongResponseForm
                  patientId={patientId}
                  handleClose={handleClose}
                  {...props}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <>
          <div className="SongCard">
            <h6>{props.song.year}</h6>
            <h6>Billboard Rank: {props.song.position}</h6>
            {/* <h3>id: {props.song.id}</h3> */}
            <h6>
              Song:<strong> "{props.song.song_title}"</strong>
            </h6>
            <h6>Artist: {props.song.artist}</h6>
          </div>
        </>
      )}
    </div>
  );
};
