"use strict";

import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import LoginButton from "./LoginButton";

import {UserContext} from "../App";
import ProfilePopover from "./ProfilePopover";
import UserService from "../services/UserService";

import Logo from "../../contrib/img/logoRound.png";

class Header extends React.Component {

  static contextType;

  constructor(props) {
    super(props);

    Header.contextType = UserContext;
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    console.log("Handle Logout");
    try{
      UserService.logout();
      this.context.setUser(null);
    }catch (e) {
      console.log(error);
    }
  }

  render() {
    console.log("HEADER: " + this.context.user);
    return (
        <Navbar bg="primary" expand={"lg"} sticky={"top"}>
          <Navbar.Brand>
            <img alt="" src={Logo} width="90" height="90"
                 className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id={"responsive-navbar-nav"} className="justify-content-end">
            <div>
              {(this.context.user != null) && <ProfilePopover handleLogout={this.handleLogout}/>}
              {!(this.context.user != null) && <LoginButton/>}
            </div>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;
