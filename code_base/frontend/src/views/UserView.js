"use strict";
import React, { Component } from 'react'
import axios from 'axios';
import Group from '../components/ListGroup';

export class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      userData: null
    }
  };
  componentDidMount(){
    const username = this.props.match.params.username;

    // axios.get(`/#/user/${username}`)
    axios.get(`/#/user/5ee8f3a2ddef865d322355ed`)
    .then(res => {
      console.log(res)
      this.setState({
        userData: res.data
      })
    });

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
      <div>
        <Group/>
        <Group/>
      </div>
      // this.state.groups.map(group => <Group key={group._id} group={group}/>)
    ) : <p>Loading...</p>

    // var recentGroupMarkup = this.state.groups.map(function(itemData) {
    //   return (
    //     <Group title={itemData.name} key={itemData.id} number={itemData.id}/>
    //   );
    // });


    return (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {recentGroupMarkup}
            </div>
            <div className="col-sm">
              <p>Profile Info...</p>
              <p>Insert Name Surname Here</p>
              {/* {this.state.userData} */}
              <p></p>
            </div>
          </div>
        </div>
    );
  }
}

export default UserView;
