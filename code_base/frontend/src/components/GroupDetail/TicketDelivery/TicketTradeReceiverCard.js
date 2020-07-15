import Card from "react-bootstrap/Card";
import React from "react";
import userLogo from "../../../../contrib/img/user.png";
import {CheckCircle, QuestionCircle} from "react-bootstrap-icons";
import Center from "react-center";
import Button from "react-bootstrap/Button";

function ticketTradeReceiverCardBody(props) {
  if (!props.joinInformation.ticketDelivered) {
    return (
        <div>
          <QuestionCircle className={"orange"} width="fit-content" height="3em"/>
          <Center>
            <div>Delivery Pending</div>
          </Center>
        </div>
    )
  } else {
    if (props.joinInformation.ticketReceived) {
      return (
          <div>
            <CheckCircle className={"green"} width="fit-content" height="3em"/>
            <Center>
              <div>Received</div>
            </Center>
          </div>
      )
    } else {
      if (props.isCreator) {
        return (
            <div>
              <QuestionCircle className={"orange"} width="fit-content" height="3em"/>
              <Center>
                <div>Approval Pending</div>
              </Center>
            </div>
        )
      } else {
        return (
            <div className={"buttonWrapper horizontalCenter"}>
              <Button variant={"primary"} onClick={props.receivedCallback}>Approve Delivery</Button>
            </div>
        )
      }
    }
  }
}

function TicketTradeReceiverCard(props) {
  return (
      <Card style={{'marginBottom': '10px', 'height': '100%'}}>
        <div className={"userCardImageWrapper"}>
          <Card.Img variant={"top"} src={userLogo} className={"userCardImage"}/>
        </div>
        <Card.Body className={"horizontalCenter ticketTradeModalUserCardBody"}>
          <Card.Title className={"horizontalCenter"}
                      style={{'width': 'fit-content'}}> {`${props.joinInformation.joinedUser.userInformation.firstname} ${props.joinInformation.joinedUser.userInformation.surname}`}</Card.Title>
          {ticketTradeReceiverCardBody(props)}
        </Card.Body>
      </Card>
  )
}

export default TicketTradeReceiverCard;
