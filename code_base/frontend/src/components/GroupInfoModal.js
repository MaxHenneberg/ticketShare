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
import GroupService from "../services/GroupService";
import Spinner from "react-bootstrap/Spinner";

class GroupInfoModal extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      loading: false,
      error: false,
      occSlots: 0,
      pricePerPerson: 0
    }
  }

  renderSlots() {
    if(this.state.loading){
      return <Spinner animation="border" />
    }else{
      if(!this.state.error) {
        console.log("Render Slots");
        console.log(this.props.group.ticketInformation.maxCoveredPeople);
        let slotList = [];
        for (let i = 0; i < this.props.group.ticketInformation.maxCoveredPeople; i++) {
          console.log(i);
          if (i < this.state.occSlots) {
            slotList.push(<PersonFill className="occupiedSlot"/>);
            console.log("occ");
          } else {
            slotList.push(<PersonFill className="freeSlot"/>);
            console.log("free")
          }
        }
        return slotList;
      }else{
        console.log("Error");
        return <div>Error...</div>
      }
    }


  }

  renderDate(deadline) {
    if(deadline){
      let date = Date.parse(deadline);
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    }else{
      return "-";
    }

  }

  renderPrice(){
    return this.props.pricePerPerson+" "+this.props.group.ticketInformation.currency.name;
  }

  componentDidMount(): void {
    this.setState({loading:true});
    GroupService.countOccSlots(this.props.group._id).then((data) => this.setState({occSlots: data, loading:false})).catch((error)=>this.setState({loading:false, error:true}));
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
            <Col xs={10}>
              <Row className="modalRow">
                <Col xs={4}>
                  Name:
                </Col>
                <Col xs={8}>
                  {this.props.group.name}
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={4}>
                  Type:
                </Col>
                <Col>
                  {this.props.group.type}
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={4}>
                  Price:
                </Col>
                <Col>
                  {this.renderPrice()}
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={4}>
                  Slots:
                </Col>
                <Col>
                  {
                   this.renderSlots()
                  }
                </Col>
              </Row>
              <Row className="modalRow">
                <Col xs={4}>
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
              <Row className="modalRow">
                <Col xs={4}>
                  Deadline:
                </Col>
                <Col>
                  {this.renderDate(this.props.group.joinDeadline)}
                </Col>
              </Row>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button variant={"Primary"}
                    onClick={this.props.openPayment}>Checkout</Button>
            <Button variant={"secondary"}>Close</Button>
          </ModalFooter>
        </Modal>
    );
  }
};

export default GroupInfoModal;
