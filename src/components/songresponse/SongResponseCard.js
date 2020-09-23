import React, { useState } from "react";
import "./SongResponse.css";
import { SongResponseDetail } from "../songresponse/SongResponseDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ApiManager from "../../modules/ApiManager";
import "./SongResponse.css";
import { SongResponseEdit } from "./SongResponseEdit";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export const SongResponseCard = (props) => {
  const [show, setShow] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  const dateCreated = props.songResponse.created_at;
  const songTitle = props.song_title;
  const artist = props.artist;
  const responseId = props.songResponse.id;

  const eye_contact_score = parseInt(props.eye_contact_id);
  const talkativeness_score = parseInt(props.talkativeness_id);
  const mood_score = parseInt(props.mood_id);
  const movement_score = parseInt(props.movement_id);
  const vocalization_score = parseInt(props.vocalization_id);
  const liked_song_score = parseInt(props.liked_song_id);

  const totalScore =
    eye_contact_score +
    talkativeness_score +
    mood_score +
    movement_score +
    vocalization_score +
    liked_song_score;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteConfirm = () => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this song response?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            deleteSongResponse("songresponses", props.songResponse.id),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const deleteSongResponse = (type, id) => {
    ApiManager.destroy(type, id).then(() => props.history.push("/patients"));
  };

  // Here I'm trying to state to True so that I can see it is True and return something different on Song
  // Response DetailsDetails
  const changeFormTrue = () => setEditClicked(!editClicked);

  return (
    <>
      <div className="songResponseCard">
        <h4>
          <strong>Score: {totalScore}/36</strong>
        </h4>
        <h5>{dateCreated}</h5>
        <h5>
          <strong>"{songTitle}"</strong> by: {artist}
        </h5>
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
                  totalScore={totalScore}
                  responseId={responseId}
                  // THis is an experiment if I can get set up a different display
                  // of information in modal if
                  //State of editClicked was changed to True
                />
              ) : (
                <SongResponseEdit
                  {...props}
                  getSongResponses={props.getSongResponses}
                  changeFormTrue={changeFormTrue}
                  responseId={responseId}
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
                        deleteConfirm();
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
