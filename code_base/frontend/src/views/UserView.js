"use strict";
import React, { Component } from 'react'
import axios from 'axios';
import Group from '../components/ListGroup';

export class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null
    }
  };
  componentDidMount(){
    axios.get('/#/groups')
    .then(res => {
        this.setState({
            groups: res.data
        })
    })
    .catch(err => console.log(err));


  }
  render() {
    let recentGroupMarkup = this.state.groups ? (
      <Group/>
      // this.state.groups.map(group => <Group key={group._id} group={group}/>)
    ) : <p>Loading...</p>

    return (
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              {recentGroupMarkup}
            </div>
            <div class="col-sm">
              <p>Profile Info...</p>
              <p>Insert Name Surname Here</p>
              <p></p>
            </div>
          </div>
        </div>
    );
  }
}

export default UserView;
