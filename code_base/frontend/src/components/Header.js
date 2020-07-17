"use strict";

import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {Shield, PersonCircle} from "react-bootstrap-icons";
import LoginButton from "./LoginButton";

import {UserContext} from "../App";

class Header extends React.Component {

  static contextType;


  constructor(props) {
    super(props);

    Header.contextType = UserContext
  }

  render() {
    console.log("HEADER: "+this.context.user);
    return (
        <Navbar bg="primary" sticky={"top"}>
          <Navbar.Brand>
            <img alt="" src="" width="100" height="30"
                 className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <div>
              <Button>MyTickets<Shield/></Button>
            </div>
            <div>
              {(this.context.user != null) && <Button>{this.context.user.username}'s Profile <PersonCircle/></Button>}
              {!(this.context.user != null) && <LoginButton/>}
            </div>
          </Navbar.Collapse>
        </Navbar>
    );
  }
};

export default Header;
