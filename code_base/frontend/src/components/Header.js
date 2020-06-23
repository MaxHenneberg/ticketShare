"use strict";

import React from 'react';
import Navbar from "react-bootstrap/Navbar";
//import Logo from "../Logo.png";
import Button from "react-bootstrap/Button";
import {Search, Shield, PersonCircle} from "react-bootstrap-icons";

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Navbar bg="primary">
          <Navbar.Brand>
            <img alt="" src="" width="100" height="30"
                 className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <div>
              <Button>Search <Search/></Button>
            </div>
            <div>
              <Button>MyTickets<Shield/></Button>
            </div>
            <div>
              <Button>Login<PersonCircle/></Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
    );
  }
};

export default Header;
