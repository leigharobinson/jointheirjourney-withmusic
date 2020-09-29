import React, { useEffect, useState } from "react";
import { SongResponseCard } from "./SongResponseCard";
import "./SongResponse.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import SongResponseSearch from "./SongResponseSearch";

const SongResponseList = (props) => {
  const songResponses = props.songResponses;

  const songResponsesLength = props.songResponses.length;

  return (
    <>
      <div className="SongResponseList">
        <div>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h3>{props.patientName}'s Song Responses</h3>
                  <div>
                    <h4>Total: {songResponsesLength}</h4>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {songResponses.map((response) => (
                    <SongResponseCard
                      key={`response-${response.id}`}
                      response={response}
                      getSongResponses={props.getSongResponses}
                      {...props}
                    />
                  ))}
                  {/* <SongResponseSearch
                    songResponses={props.songResponses}
                    {...props}
                  /> */}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SongResponseList;
