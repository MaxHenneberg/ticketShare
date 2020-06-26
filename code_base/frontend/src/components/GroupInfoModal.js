"use strict";

import React from 'react';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import {PersonFill} from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import ModalBody from "react-bootstrap/ModalBody";
import Col from "react-bootstrap/Col";
import Center from "react-center";

import "./GroupInfoModal.css"
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

class GroupInfoModal extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSlots(occupied, max) {
    console.log("startedRenderSlots");
    let slotList = [];
    for (let i = 0; i < max; i++) {
      console.log(i);
      if (i < occupied) {
        slotList.push(<PersonFill className="occupiedSlot"/>);
        console.log("occ");
      } else {
        slotList.push(<PersonFill className="freeSlot"/>);
        console.log("free")
      }
    }
    return slotList;
  }

  render() {
    return (

        <Modal centered animation={false} backdrop="static"
               show={this.props.visible}>
          <ModalHeader closeButton>
            <ModalTitle>Group Info</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Col xs={2}/>
            <Col xs={8}>
              <Row className="modalRow">
                <Col xs={6}>
                  Name:
                </Col>
                <Col>
                  {this.props.group.name}
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={6}>
                  Type:
                </Col>
                <Col>
                  {this.props.group.type}
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={6}>
                  Price:
                </Col>
                <Col>
                  12 EUR
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={6}>
                  Slots:
                </Col>
                <Col>
                  <div>{this.renderSlots(3, 5)}</div>
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={6}>
                  Payment Address:
                </Col>
                <Col>
                  <FormControl as={"select"}
                               placeholder={"Select Payment Address"}>
                    <option>1. Address</option>
                    <option> 2. Address</option>
                  </FormControl>
                </Col>
              </Row>
            </Col>
            < Col
                xs={2}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant={"Primary"} onClick={this.props.openPayment}>Checkout</Button>
            <Button variant={"secondary"}>Close</Button>
          </ModalFooter>
        </Modal>
    );
  }
};

export default GroupInfoModal;
