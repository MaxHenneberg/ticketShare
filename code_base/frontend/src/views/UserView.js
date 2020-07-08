"use strict";
import React, { Component } from 'react'
import axios from 'axios';
import Group from '../components/ListGroup';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron'
import HttpService from '../services/HttpService'
import UserService from '../services/UserService'

export const axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

const divStyle = {
  // margin: '30px 30px 30px 30px',
  marginTop: '30px'
};

async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      userData: {
        firstname: "",
        surname: ""
      },
      username: ""
    }
  };
  componentDidMount(){
    const username = this.props.match.params.username;
    
    fetchAsync(`http://localhost:8080/users`)
    .then(res => {
      this.setState({
        userData: res[0].UserInformation,
        username: res[0].username
      })
    })

    fetchAsync(`http://localhost:8080/groups`)
    .then(res => {
      this.setState({
        groups: res,
      })
    })
    .then(res => {
      console.log(this.state.groups)
    })

  }
  render() {
    let recentGroupMarkup = this.state.groups ? (
      this.state.groups.map(group => <Group key={group._id} group={group}/>)

    ) : <p>Loading...</p>

    
    // var recentGroupMarkup = this.state.groups.map(function(itemData) {
    //   return (
    //     <Group title={itemData.name} key={itemData.id} number={itemData.id}/>
    //   );
    // });

    return (
      <Jumbotron className="container bg-light" style={divStyle}>
        <Row className="align-items-center">
          <Col>
            {recentGroupMarkup}
          </Col>
          <Col xs={4}>
            <div>
              <Card>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>Hi {this.state.userData.firstname} {this.state.userData.surname}!</Card.Title>
                  <Card.Text>
                    @{this.state.username}
                  </Card.Text>
                  <Card.Text>
                    Here are your groups!
                  </Card.Text>
                  <Button variant="primary">Add/Edit Address</Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default UserView;
