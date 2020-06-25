"use strict";

import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class SearchGroup extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Form>
          <Form.Row>
            <Col xs={10}>
              <Form.Control placeholder="Search..."/>
            </Col>
            <Col xs={2}>
              <Button variant="primary">Search</Button>
            </Col>
          </Form.Row>
        </Form>
    );
  }
};

export default SearchGroup;
