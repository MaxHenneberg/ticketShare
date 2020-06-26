"use strict";

import React from 'react';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class GroupJoinSuccessModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Modal centered animation={false} backdrop="static"
                 show={this.props.visible}>
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
                    12€
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
                        ABC Street 7
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        City:
                      </Col>
                      <Col>
                        ABC City
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        PostalCode:
                      </Col>
                      <Col>
                        12345
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Country:
                      </Col>
                      <Col>
                        ABC Country
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
                    ABC Group
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Date:
                  </Col>
                  <Col>
                    12.06.2020
                  </Col>
                </Row>
              </Col>
            </ModalBody>
          </Modal>
        </div>
    );
  }
};

export default GroupJoinSuccessModal;
