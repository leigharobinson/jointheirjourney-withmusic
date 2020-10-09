import React, { useState } from "react";
import "./SongResponse.css";
import { SongResponseDetail } from "./SongResponseDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ApiManager from "../../modules/ApiManager";
import "./SongResponse.css";
import { SongResponseEdit } from "./SongResponseEdit";

export const SongResponseCardUnfiltered = (props) => {
  const [show, setShow] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const responseId = props.filteredSongResponse.id;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteSongResponse = (type, id) => {
    ApiManager.destroy(type, id).then(() => {
      // console.log("this thing deleted");
      props.getSongResponses();
    });

    handleClose();
  };

  // Here I'm trying to state to True so that I can see it is True and return something different on Song
  // Response DetailsDetails
  const changeFormTrue = () => setEditClicked(!editClicked);

  return (
    <>
      <div className="songResponseCard">
        <h5>{props.filteredSongResponse.created_at}</h5>
        <h4>
          <strong>Score: {props.filteredSongResponse.total}/30</strong>
        </h4>
        <h5>
          <strong>"{props.filteredSongResponse.song.song_title}"</strong>
        </h5>
        <h5>{props.filteredSongResponse.song.artist}</h5>
        <div>
          <Button variant="primary" onClick={handleShow}>
            Details
          </Button>
          <Modal show={show} onHide={handleClose}>
            <div id="modal_space"></div>
            <Modal.Header closeButton>
              <Modal.Title>
                {!editClicked ? (
                  <h1>Song Response Details</h1>
                ) : (
                  <h1>Song Response Edit</h1>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!editClicked ? (
                <SongResponseDetail
                  {...props}
                  totalScore={props.filteredSongResponse.total}
                  responseId={responseId}
                  // THis is an experiment if I can get set up a different display
                  // of information in modal if
                  //State of editClicked was changed to True
                />
              ) : (
                <SongResponseEdit
                  {...props}
                  changeFormTrue={changeFormTrue}
                  responseId={responseId}
                  songResponses={props.songResponses}
                  getSongResponses={props.getSongResponses}
                  patientName={props.filteredSongResponse.patient.first_name}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              {!editClicked ? (
                <>
                  <div>
                    <Button
                      className="modal_btn"
                      variant="primary"
                      onClick={() => {
                        changeFormTrue();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="modal_btn"
                      variant="danger"
                      onClick={() => {
                        deleteSongResponse(
                          "songresponses",
                          props.filteredSongResponse.id
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Button
                      className="modal_btn"
                      variant="primary"
                      onClick={() => {
                        setEditClicked(false);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
