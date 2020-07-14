"use strict";

import React from 'react';

import UserLogin from '../components/Legacy/UserLogin';

import UserService from '../services/legacy/UserService';
import GroupJoinButton from "../components/GroupJoinButton";


export class GroupView extends React.Component {

  constructor(props) {
    super(props);
    //only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
    this.state = {};
  }

  render() {
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }
    return (
        <GroupJoinButton groupId={''}></GroupJoinButton>
    );
  }
}
