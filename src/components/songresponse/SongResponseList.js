import React, { useEffect, useState } from "react";
import { SongResponseCard } from "./SongResponseCard";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import ApiManager from "../../modules/ApiManager";
import "./SongResponse.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SongResponseList = (props) => {
  const songResponses = props.songResponses;
  return (
    <>
      <div className="SongResponseList">
        <div>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h3>{props.patientName}'s Song Responses</h3>
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
