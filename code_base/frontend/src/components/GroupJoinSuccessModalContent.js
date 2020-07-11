"use strict";

import React from 'react';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

class GroupJoinSuccessModalContent extends React.Component {

  constructor(props) {
    super(props);
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

  render() {
    return (
        <div>
            <ModalHeader closeButton>
              <ModalTitle>Join Group Finish</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Col xs={1}/>
              <Col>
                <Row>
                  Payment Information:
                </Row>
                <Row>
                  <Col>
                    Payed:
                  </Col>
                  <Col>
                    {this.renderPrice()}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Billing Address:
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        Street:
                      </Col>
                      <Col>
                        {this.props.selectedAddress.street}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        City:
                      </Col>
                      <Col>
                        {this.props.selectedAddress.city}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        PostalCode:
                      </Col>
                      <Col>
                        {this.props.selectedAddress.countryCode}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Country:
                      </Col>
                      <Col>
                        {this.props.selectedAddress.country}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  Group Information:
                </Row>
                <Row>
                  <Col>
                    Group Name:
                  </Col>
                  <Col>
                    {this.props.group.name}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Date:
                  </Col>
                  <Col>
                    {this.renderDate(this.props.group.ticket.eventInformation.eventStart)+" - "+this.renderDate(this.props.group.ticket.eventInformation.eventEnd)}
                  </Col>
                </Row>
              </Col>
            </ModalBody>
          <ModalFooter>
          <Button variant={"primary"} onClick={this.props.callback}>Finish</Button>
        </ModalFooter>
        </div>
    );
  }
};

export default GroupJoinSuccessModalContent;
