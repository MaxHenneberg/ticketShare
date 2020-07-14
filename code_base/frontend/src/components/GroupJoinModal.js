"use strict";
import React from "react";
import GroupJoinModalContent from "./GroupJoinModalContent";
import Modal from "react-bootstrap/Modal";
import PaymentModalContent from "./PaymentModalContent";
import GroupJoinSuccessModalContent from "./GroupJoinSuccessModalContent";
import GroupService from "../services/GroupService";

class GroupJoinModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBody: "info",
      selectedAddress: null,
      joinInformation: null
    };

    this.paymentCallback = this.paymentCallback.bind(this);
    this.openPaymentHandler = this.openPaymentHandler.bind(this);
    this.finishCallback = this.finishCallback.bind(this);
  }

  hasFreeSlot() {
    return this.props.group.ticket.initialFreeSlotsLeft > this.state.occSlots;
  }

  async openPaymentHandler(address) {
    console.log("Open Payment");
    await GroupService.initGroupJoin(this.props.group._id).then((data) => this.setState({joinInformation: data})).catch((e) => console.error(e));
    console.log("Got JoinInfo: " + this.state.joinInformation._id);
    this.setState({currentBody: "payment", selectedAddress: address});
  }

  async paymentCallback(result) {
    console.log(this);
    console.log("paymentCallback");
    if (result) {
      console.log(result.payed);
      if (result.payed) {
        this.setState({currentBody: "success"});
      }
    }
  }

  finishCallback() {
    this.props.onClose();
    this.setState({currentBody: "info", selectedAddress: null});
  }

  reset() {
    this.props.onAbort();
    this.setState({currentBody: "info", selectedAddress: null});
  }

  renderBody() {
    switch (this.state.currentBody) {
      case "info":
        return <GroupJoinModalContent group={this.props.group} openPayment={this.openPaymentHandler} pricePerPerson={this.props.pricePerPerson}/>;
      case "payment":
        return <PaymentModalContent group={this.props.group} callback={this.paymentCallback} pricePerPerson={this.props.pricePerPerson}
                                    selectedAddress={this.state.selectedAddress} joinInformation={this.state.joinInformation}/>;
      case "success":
        return <GroupJoinSuccessModalContent group={this.props.group} pricePerPerson={this.props.pricePerPerson} selectedAddress={this.state.selectedAddress}
                                             callback={this.finishCallback}/>
    }
  }

  render() {
    return (
        <Modal centered animation={false} backdrop="static"
               show={this.props.visible} onHide={() => this.reset()}>
          {this.renderBody()}
        </Modal>
    );
  }
};

export default GroupJoinModal;
