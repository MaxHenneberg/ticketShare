"use strict";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import {PersonFill} from "react-bootstrap-icons";
import GroupService from "../services/GroupService";
import UserService from "../services/UserService";
import ReactDOM from "react-dom";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

import "./GroupInfoModal.css";
import Utils from "../utils/Util";

class GroupJoinModalContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      occSlots: 0,
      pricePerPerson: 0,
      addresses: null,
      visible: true
    };

    this.selectedAddress = null
  }

  renderSlots() {
    console.log("RENDER SLOTS!!!!!");
    if (this.state.loading) {
      return <Spinner animation="border"/>
    } else {
      if (!this.state.error) {
        return Utils.renderSlots(this.props.group.ticket.initialFreeSlotsLeft,this.state.occSlots)
      } else {
        console.log("Error");
        return <div>Error...</div>
      }
    }

  }

  hasFreeSlot(){
    return this.props.group.ticket.initialFreeSlotsLeft>this.state.occSlots;
  }

  renderDate(deadline) {
    if (deadline) {
      let date = new Date(Date.parse(deadline));
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
    } else {
      return "-";
    }
  }

  renderPrice() {
    return this.props.pricePerPerson + " "
        + this.props.group.ticket.currency.name;
  }

  renderAddresses() {
    let optionList = [];
    if (this.state.addresses != null && this.state.addresses.length>0) {
      console.log("Start Render Address:"+this.state.addresses);
      this.selectedAddress = this.state.addresses[0];
      console.log("Default Address: "+this.selectedAddress.nickName);
      for(let i = 0; i < this.state.addresses.length;i++){
        optionList.push(<option value={i}>{this.state.addresses[i].nickName}</option>);
      }
      return optionList;
    } else {
      console.log("Loading: ");
      return optionList.push(<option>Loading...</option>);
    }
  }

  componentDidMount(): void {
    this.setState({loading: true, visible:true});
    GroupService.countOccSlots(this.props.group._id).then(
        (data) => this.setState({occSlots: data.occupied, loading: false})).catch(
        (error) => this.setState({loading: false, error: true}));
    UserService.getAddress().then(
        (data) => this.setState({addresses: data})).catch(
        (error) => console.error(error));
  }

  selectAddressHandler(event){
    let i = ReactDOM.findDOMNode(this.select).value
    this.selectedAddress = this.state.addresses[i];
    console.log("Select Adress: "+ this.selectedAddress.nickName);
  }

  render() {
    return (
        <div>
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
                <FormControl as={"select"} id={"selectAddressDropdown"}
                             placeholder={"Select Payment Address"} onChange={this.selectAddressHandler.bind(this)} ref={select => {
                  this.select = select
                }}>
                  {this.renderAddresses()}
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
            <Button variant={"success"}
                    onClick={() => this.props.openPayment(this.selectedAddress)} disabled={!this.hasFreeSlot()}>Checkout</Button>
            <Button variant={"secondary"}>Close</Button>
          </ModalFooter>
        </div>
    );
  }
};

export default GroupJoinModalContent;
