"use strict";

import React from 'react';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import PaypalButton from "./PaypalButton";
import ModalBody from "react-bootstrap/ModalBody";

class PaymentModalContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

      return (
          <div>
            <ModalHeader closeButton>
              <ModalTitle>Payment</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <PaypalButton callback={this.props.callback} caller={this} group={this.props.group} pricePerPerson={this.props.pricePerPerson}
                          selectedAddress={this.props.selectedAddress} modalVisible={true} joinInformation={this.props.joinInformation}/>
            </ModalBody>
          </div>
      );
  }
};

export default PaymentModalContent;
