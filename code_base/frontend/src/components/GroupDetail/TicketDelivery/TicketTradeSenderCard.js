import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormFile from "react-bootstrap/FormFile";
import Button from "react-bootstrap/Button";
import {CheckCircle, PlusCircle} from "react-bootstrap-icons";
import Center from "react-center";
import React from "react";

import userLogo from "../../../../contrib/img/user.png";

function ticketTradeSenderCardBody(props) {
  if (props.isCreator) {
    return (<div>
          {!props.joinInformation.ticketDelivered &&
          <Form onSubmit={(event) => props.deliverTicket(event)}>
            <FormGroup>
              <FormFile className="position-relative"
                        name="file"
                        label={"Upload Proof: "} accept={"image/*,.pdf"} onChange={(event) => props.setUploadedFile(event.target.value)}/>
            </FormGroup>
            <div className={"buttonWrapper horizontalCenter"}>
              <Button variant={"primary"} type={"submit"}>Deliver</Button>
            </div>
          </Form>}
          {props.joinInformation.ticketDelivered &&
          <div>
            <CheckCircle className={"green"} width="fit-content" height="3em"/>
            <Center>
              <div>Delivered</div>
            </Center>
          </div>}
        </div>
    )
  } else {
    return (
        <div>
        {!props.joinInformation.ticketDelivered &&
        <div>
          <PlusCircle className={"redIcon"} width="fit-content" height="3em"/>
          <Center>
            <div>Delivery pending...</div>
          </Center>
        </div>
        }
          {props.joinInformation.ticketDelivered &&
          <div>
            <CheckCircle className={"green"} width="fit-content" height="3em"/>
            <Center>
              <div>Delivered</div>
            </Center>
          </div>
          }
        </div>
    );
  }

}

function TicketTradeSenderCard(props) {
    return (
        <Card style={{'marginBottom': '10px', 'height': '100%'}}>
          <div className={"userCardImageWrapper"}>
            <Card.Img variant={"top"} src={userLogo} className={"userCardImage"}/>
          </div>
          <Card.Body className={"horizontalCenter ticketTradeModalUserCardBody"}>
            <Card.Title className={"horizontalCenter"}
                        style={{'width': 'fit-content'}}>{`${props.group.creator.userInformation.firstname} ${props.group.creator.userInformation.surname}`}</Card.Title>
            {ticketTradeSenderCardBody(props)}
          </Card.Body>
        </Card>);

}

export default TicketTradeSenderCard;
