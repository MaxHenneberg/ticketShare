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
      successModalVisible: false,
      pricePerPerson: 0
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

  calcPricePerPerson(){
    let price = this.props.group.ticketInformation.fullPrice/this.props.group.ticketInformation.maxCoveredPeople;
    this.setState({pricePerPerson: price.toFixed(2)})
  }

  componentDidMount(): void {
    this.calcPricePerPerson()
  }

  render() {
    return (
        <div>
          <Button variant={"primary"}
                  onClick={() => this.openGroupInfo()}>X</Button>
          <GroupInfoModal
              visible={this.state.groupInfoVisible}
              openPayment={() => this.openPaymentModal()} group={this.state.group} pricePerPerson={this.state.pricePerPerson}/>
          <PaymentModal visible={this.state.paymentModalVisible} successCallBack={() => this.openSuccessModal()} group={this.state.group} pricePerPerson={this.state.pricePerPerson}/>
          <GroupJoinSuccessModal visible={this.state.successModalVisible}/>
        </div>
    );
  }
};

export default GroupJoinButton;
