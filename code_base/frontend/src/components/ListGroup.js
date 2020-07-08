"use strict";

import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ListGroup.css"
import {CloudFill, Check} from "react-bootstrap-icons";

class ListGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div className="listItem">
            <Row>
              <Col xs={2}>
                <CloudFill/>
              </Col>
              <Col xs={10}>
                <Row>
                  <Col>
                    GroupTitel {this.props.group.name}
                  </Col>
                  <Col>
                    <div className="float-sm-right">
                      Already bought <Check/>
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col>
                    11,6€/Person
                  </Col>
                  <Col>
                    23/05/2020
                  </Col>
                  <Col>
                    <div className="float-sm-right">
                      XXX/00
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="listItem">
            <Row>
              <Col xs={2}>
                <CloudFill/>
              </Col>
              <Col xs={10}>
                <Row>
                  <Col>
                    GroupTitel
                  </Col>
                  <Col>
                    <div className="float-sm-right">
                      Already bought2 <Check/>
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col>
                    11,6€/Person
                  </Col>
                  <Col>
                    23/05/2020
                  </Col>
                  <Col>
                    <div className="float-sm-right">
                      XXX/00
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
};

export default ListGroup;
