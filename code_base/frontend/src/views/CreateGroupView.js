"use strict";

import React from "react";
import CreateGroupForm from "../components/group/CreateGroupForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Card} from "react-md";

export class CreateGroupView extends React.Component {
	constructor(props) {
		super(props);
		//only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
		this.state = {};
	}

	render() {
		return (
      <Container>
        <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
              <Card>
                <Row>
                  <Col xs={1}></Col>
                  <Col xs={10}>
                    <CreateGroupForm></CreateGroupForm>
                  </Col>
                  <Col xs={1}></Col>

                </Row>
              </Card>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
		);
	}
}

export default CreateGroupView;
