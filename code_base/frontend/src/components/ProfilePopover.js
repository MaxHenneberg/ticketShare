import Popover from "react-bootstrap/Popover";
import React, {useContext} from "react";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import {PersonCircle, DoorOpenFill, Files, PlusCircle} from "react-bootstrap-icons";

import {UserContext} from "../App";
import "./Login.css";
import CreateGroupHome from "./CreateGroupHome";

function ProfilePopover(props) {
  const userContext = useContext(UserContext);
  const popover = (
      <Popover id={"popover-basic"}>
        <PopoverTitle as="h3">Welcome {userContext.user.username}</PopoverTitle>
        <PopoverContent>
          <ul className={"buttonList"}>
            <li className={"buttonListElement"}><Button variant={"light"} className={"popoverButton"}>Show Profile  <PersonCircle className={"float-right popoverIcon"}/></Button></li>
            <li className={"buttonListElement"}><Button variant={"light"} className={"popoverButton"}>My Tickets <Files className={"float-right popoverIcon"}/></Button></li>
            <li className={"buttonListElement"}><CreateGroupHome/></li>
            <li className={"buttonListElement"}><Button variant={"danger"} className={"popoverButton"} onClick={() => props.handleLogout()}>Logout <DoorOpenFill className={"float-right popoverIcon"}/></Button></li>
          </ul>
        </PopoverContent>
      </Popover>);
  return (
      <OverlayTrigger overlay={popover} trigger="click" placement="bottom">
        <Button variant={"outline-light"}>{userContext.user.username}'s Profile <PersonCircle/></Button>
      </OverlayTrigger>
  )
}

export default ProfilePopover
