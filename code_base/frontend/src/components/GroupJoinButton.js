"use strict";

import React from 'react';
import Button from "react-bootstrap/Button";
import GroupInfoModal from "./GroupInfoModal";
import PaymentModal from "./PaymentModal";
import GroupJoinSuccessModal from "./GroupJoinSuccessModal";

class GroupJoinButton extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constr");
    console.log(props.group);
    this.state = {
      group: props.group,
      groupInfoVisible: false,
      paymentModalVisible: false,
      successModalVisible: false
    }
  }

  openGroupInfo() {
    this.setState({groupInfoVisible: true, paymentModalVisible: false});
  }

  openPaymentModal() {
    console.log("Open Payment");
    this.setState({groupInfoVisible: false, paymentModalVisible: true});
  }

  openSuccessModal(){
    console.log("Open Success");
    this.setState({paymentModalVisible: false, successModalVisible: true});
  }

  render() {
    return (
        <div>
          <Button variant={"primary"}
                  onClick={() => this.openGroupInfo()}>X</Button>
          <GroupInfoModal
              visible={this.state.groupInfoVisible}
              openPayment={() => this.openPaymentModal()} group={this.state.group}/>
          <PaymentModal visible={this.state.paymentModalVisible} successCallBack={() => this.openSuccessModal()}/>
          <GroupJoinSuccessModal visible={this.state.successModalVisible}/>
        </div>
    );
  }
};

export default GroupJoinButton;
