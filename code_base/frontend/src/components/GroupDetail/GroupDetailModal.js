import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Center from 'react-center';
import React, {useState} from "react";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import GroupInfo from "./GroupInfo";
import GroupJoinButton from "../GroupJoinButton";
import CardDeck from "react-bootstrap/CardDeck";
import JoinedUserCard from "./JoinedUserCard";
import Utils from "../../utils/Util";
import {UserContext} from "../../App";
import GroupService from "../../services/GroupService";

async function updateJoinInformation(groupId, setJoinInformation) {
  const infos = await GroupService.joinInfosForGroup(groupId);
  setJoinInformation(infos);
}

function loggedInArea(props) {
  const userContext = React.useContext(UserContext);
  const [joinInformation, setJoinInformation] = React.useState(null);
  if (!joinInformation) {
    GroupService.joinInfosForGroup(props.group._id).then(result => setJoinInformation(result)).catch(e => console.error(e));
  }
  if (userContext.user && joinInformation) {
    if (Utils.isUserJoined(userContext.user, joinInformation) || Utils.isUserCreator(userContext.user, props.group)) {
      let joinedInfo = [];

      for (const info of joinInformation) {
        joinedInfo.push(<JoinedUserCard joinInformation={info} user={userContext.user} group={props.group}/>)
      }
      return <CardDeck className={"scrollableCardDeck"}>{joinedInfo}</CardDeck>
    }
    if (props.group.creator === userContext.user._id) {
      return <div>Creator</div>
    }
    return (
        <Center>
          <GroupJoinButton group={props.group} callback={() => updateJoinInformation(props.group._id, setJoinInformation)}/>
        </Center>
    )
  } else {
    return "";
  }
}

function GroupDetailModal(props) {
  return (
      <Modal centered animation={false} backdrop="static" backdropClassName={"backdrop"}
             show={props.visible} onHide={() => props.onHideCallback()}>
        <ModalHeader closeButton>
          <ModalTitle>Group Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <GroupInfo group={props.group} pricePerPerson={props.pricePerPerson}/>
          {props.visible && loggedInArea(props)}
        </ModalBody>
      </Modal>
  );
}

export default GroupDetailModal;
