import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import React from "react";

import "../../GroupInfoModal.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {ArrowRight} from "react-bootstrap-icons"
import GroupService from "../../../services/GroupService";
import TicketTradeSenderCard from "./TicketTradeSenderCard";
import TicketTradeReceiverCard from "./TicketTradeReceiverCard";
import Utils from "../../../utils/Util";

class TicketTradeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      joinInformation: props.joinInformation
    }

    this.deliverTicket = this.deliverTicket.bind(this);
    this.setUploadedFile = this.setUploadedFile.bind(this);
    this.receivedCallback = this.receivedCallback.bind(this);
  }

  async deliverTicket(event) {
    event.preventDefault();
    try {
      const result = await GroupService.deliverTicket(this.state.joinInformation._id, this.state.uploadedFile);
      if (result && result.ticketDelivered) {
        const nJoinInfo = this.state.joinInformation;
        nJoinInfo.ticketDelivered = true;
        await this.setState({joinInformation: nJoinInfo});
      }
      console.log("deliverTicket:" + result);

    } catch (e) {
      console.error("CATCH DELIVER TICKET:" + e);
    }

  }

  setUploadedFile(file) {
    this.setState({uploadedFile: file});
  }

  async receivedCallback() {
    try {
      const result = await GroupService.receiveTicket(this.state.joinInformation._id);
      if (result && result.ticketReceived) {
        const nJoinInfo = this.state.joinInformation;
        nJoinInfo.ticketReceived = true;
        await this.setState({joinInformation: nJoinInfo});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
        <Modal centered animation={false} size={"lg"} backdrop="static" backdropClassName={"backdrop"}
               show={this.props.visible} onHide={() => this.props.onHideCallback(false)}>
          <ModalHeader closeButton>
            <ModalTitle>Ticket Delivery</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs={5}>
                <TicketTradeSenderCard isCreator={Utils.isUserCreator(this.props.user, this.state.joinInformation)} group={this.props.group} joinInformation={this.state.joinInformation}
                                       deliverTicket={this.deliverTicket} setUploadedFile={this.setUploadedFile}/>
              </Col>
              <Col xs={2}>
                <ArrowRight className={"deliverArrow"} viewBox="0 0 15 15" width="fit-content" height="fit-content"/>
              </Col>
              <Col xs={5}>
                <TicketTradeReceiverCard isCreator={Utils.isUserCreator(this.props.user, this.state.joinInformation)} joinInformation={this.state.joinInformation}
                                         receivedCallback={this.receivedCallback}/>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
    );
  }
};

export default TicketTradeModal;
