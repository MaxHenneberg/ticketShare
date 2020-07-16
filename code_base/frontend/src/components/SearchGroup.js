"use strict";

import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import {debounce} from "throttle-debounce";

import {ChevronRight, ChevronDown} from "react-bootstrap-icons"
import GroupService from "../services/GroupService";

import "./ListGroup.css";

class SearchGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showAdvancedOptions: false,
      searchFields: {
        groupName: null,
        creator: null,
        joinDeadline: null,
        eventName: null,
        eventStart: null,
        eventEnd: null
      }
    };

    this.handleFormInputDebounced = debounce(400, this.handleFormInput)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormInput(fieldName, value) {
    console.log(`${fieldName}: ${value}`);
    let fields = this.state.searchFields;
    fields[fieldName] = value;
    this.setState({searchFields: fields});
  }

  async handleSubmit(event) {
    await this.props.searchingCallback();
    GroupService.search(this.state.searchFields).then(result => {
          console.log(result);
          this.props.searchCallback(result);
        }
    ).catch(error => console.error(error));
  }

  render() {
    return (
        <div className={"searchBox"}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <FormGroup as={Col}>
                <FormLabel>Group Name</FormLabel>
                <FormControl placeholder={"Group Name"} onChange={(event) => this.handleFormInputDebounced("groupName", event.target.value)}/>
              </FormGroup>
            </Form.Row>
            <Form.Row>
              <FormGroup className={"float-sm-right"}>
                {this.state.showAdvancedOptions && <Button onClick={() => this.setState({showAdvancedOptions: false})}><ChevronDown/> Hide Advanced Options</Button>}
                {!this.state.showAdvancedOptions && <Button onClick={() => this.setState({showAdvancedOptions: true})}><ChevronRight/> Show Advanced Options</Button>}
              </FormGroup>
            </Form.Row>
            <Collapse in={this.state.showAdvancedOptions}>
              <div>
                <Form.Row>
                  <FormGroup as={Col}>
                    <FormLabel>Group Creator</FormLabel>
                    <FormControl placeholder={"Creator"} onChange={(event) => this.handleFormInputDebounced("creator", event.target.value)}/>
                  </FormGroup>

                  <FormGroup as={Col}>
                    <FormLabel> Group JoinDeadline</FormLabel>
                    <FormControl placeholder={"JoinDeadline"} type={"date"} onChange={(event) => this.handleFormInputDebounced("joinDeadline", event.target.value)}/>
                  </FormGroup>
                </Form.Row>

                <Form.Row>
                  <FormGroup as={Col}>
                    <FormLabel>Event</FormLabel>
                  </FormGroup>
                </Form.Row>

                <Form.Row>
                  <FormGroup as={Col}>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl placeholder={"Event Name"} onChange={(event) => this.handleFormInputDebounced("eventName", event.target.value)}/>
                  </FormGroup>
                </Form.Row>

                <Form.Row>
                  <FormGroup as={Col}>
                    <FormLabel>Event Start</FormLabel>
                    <FormControl placeholder={"Event Start"} type={"date"} onChange={(event) => this.handleFormInputDebounced("eventStart", event.target.value)}/>
                  </FormGroup>

                  <FormGroup as={Col}>
                    <FormLabel>Event End</FormLabel>
                    <FormControl placeholder={"Event End"} type={"date"} onChange={(event) => this.handleFormInputDebounced("eventEnd", event.target.value)}/>
                  </FormGroup>
                </Form.Row>
              </div>
            </Collapse>
            <Form.Row>
              <Button type={"submit"}>Search</Button>
            </Form.Row>
          </Form>
        </div>
    );
  }
};

export default SearchGroup;
