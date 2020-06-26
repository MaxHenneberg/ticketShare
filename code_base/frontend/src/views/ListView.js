"use strict";
import React from 'react';
import SearchGroup from "../components/SearchGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "../components/ListGroup";

export class ListView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Row>
            <Col xs={1}/>
            <Col xs={10}>
              <SearchGroup/>
            </Col>
            <Col xs={1}/>
          </Row>
          <Row>
            <Col xs={1}/>
            <Col xs={10}>
              <ListGroup/>
            </Col>
            <Col xs={1}/>
          </Row>
        </div>
    );
  }
}

export default ListView;
