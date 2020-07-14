import Card from "react-bootstrap/Card";
import React from "react";

import userLogo from "../../contrib/img/user.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {CheckCircle, PlusCircle} from "react-bootstrap-icons";

function JoinedUserCard(props){
  return(
      <Card className={"userCardTitle"}>
        <div className={"userCardImageWrapper"}>
        <Card.Img variant={"top"} src={userLogo} className={"userCardImage"}/>
        </div>
        <Card.Body>
          <Card.Title> {`${props.joinInformation.joinedUser.userInformation.firstname} ${props.joinInformation.joinedUser.userInformation.surname}`}</Card.Title>
          <Card.Text>
            <Row>
              <Col xs={8}>
                Payed:
              </Col>
              <Col>
                {(props.joinInformation.payed) && <CheckCircle className={"greenIcon"}/>}
                {(!props.joinInformation.payed) && <PlusCircle className={"redIcon"}/>}
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                Ticket Delivered:
              </Col>
              <Col>
                {(props.joinInformation.ticketDelivered) && <CheckCircle className={"greenIcon"}/>}
                {(!props.joinInformation.ticketDelivered) && <PlusCircle className={"redIcon"}/>}
              </Col>
            </Row>
            <Row>
              <Col xs={8}>
                Ticket Recieved:
              </Col>
              <Col>
                {(props.joinInformation.ticketReceived) && <CheckCircle className={"greenIcon"}/>}
                {(!props.joinInformation.ticketReceived) && <PlusCircle className={"redIcon"}/>}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
  )
}

export default JoinedUserCard;
