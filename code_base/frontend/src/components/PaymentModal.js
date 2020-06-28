"use strict";

import React from 'react';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import PaypalButton from "./PaypalButton";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

class PaymentModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Modal centered animation={false} backdrop="static"
               show={this.props.visible}>
          <ModalHeader closeButton>
            <ModalTitle>Payment</ModalTitle>
          </ModalHeader>
          <PaypalButton successCallBack={this.props.successCallBack} group={this.props.group} pricePerPerson={this.props.pricePerPerson}/>
        </Modal>
    );
  }
};

export default PaymentModal;
