import React from "react";
import Center from 'react-center';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../GroupInfoModal.css"
import Banner from "./Banner";
import Utils from "../../utils/Util";

function GroupInfo(props) {
  return (
      <div>
        <Center>
          <h1>{props.group.name}</h1>
        </Center>
        <Center>
          <div className={"bannerWrapper"}>
            <Banner type={props.group.type}/>
          </div>
        </Center>
        <Center>
          <div className={"textField"}>
            {props.group.desc}
          </div>
        </Center>
        <Row>
          <Col>
            <h4>Deadline: </h4>
          </Col>
          <Col>
            {Utils.renderDate(props.group.joinDeadline)}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Creator: </h4>
          </Col>
          <Col>
            {`${props.group.creator.userInformation.firstname} ${props.group.creator.userInformation.surname}`}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Price Per Person: </h4>
          </Col>
          <Col>
            {`${props.pricePerPerson} ${props.group.ticket.currency.symbol}`}
          </Col>
        </Row>
        <div className={"eventInfoSpacing"}>
          <Row>
            <Col>
              <h3>Event Information</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Name</h4>
            </Col>
            <Col>
              {props.group.ticket.eventInformation.name}
            </Col>
          </Row>
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <h4>Description</h4>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*  <Row>*/}
          {/*    <Col>*/}
          {/*      <div className={"textField"}>*/}
          {/*          {"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}*/}
          {/*      </div>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          <Row>
            <Col>
              <h4>Date</h4>
            </Col>
            <Col>
              {Utils.renderDate(props.group.ticket.eventInformation.eventStart)} - {Utils.renderDate(props.group.ticket.eventInformation.eventEnd)}
            </Col>
          </Row>
        </div>
      </div>
  )
}

export default GroupInfo;
