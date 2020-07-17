"use strict";

import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ListGroup.css"
import {CloudFill, Check} from "react-bootstrap-icons";
import JoinGroupButton from "./GroupJoinButton";

import GroupService from "../services/GroupService";
import Spinner from "react-bootstrap/Spinner";
import GroupDetailModal from "./GroupDetail/GroupDetailModal";
import GroupDetailButton from "./GroupDetail/GroupDetailButton";

class ListGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      isLoaded: false,
      group: null
    }
  }

  componentDidMount(){
    GroupService.getGroup("5ef8f53db82250555776281f").then(result=> {this.setState({group: result, isLoaded: true})}).catch(error => console.error(error));
  }

  render() {
    if(this.state.isLoaded){
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
                    GroupTitel
                  </Col>
                  <Col>
                    <div className="float-sm-right">
                      Already bought <Check/>
                    </div>
                  </Col>
                  <Col xs={1} className="float-sm-right">
                    {/*{<JoinGroupButton group={this.state.group}/>}*/}
                    <GroupDetailButton group={this.state.group}/>
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
        </div>
    );}else{
      return <div><Spinner/></div>
    }
  }
};

export default ListGroup;
