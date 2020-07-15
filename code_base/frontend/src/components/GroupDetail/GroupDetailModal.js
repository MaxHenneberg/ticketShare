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

function loggedInArea(props) {
  if (props.user) {
    if (Utils.isUserJoined(props.user, props.joinInformation) || Utils.isUserCreator(props.user, props.group)) {
      let joinedInfo = [];
      for (const info of props.joinInformation) {
        joinedInfo.push(<JoinedUserCard joinInformation={info} user={props.user} group={props.group}/>)
      }

      return <CardDeck className={"scrollableCardDeck"}>{joinedInfo}</CardDeck>
    }
    if(props.group.creator === props.user._id) {
      return <div>Creator</div>
    }
    return (
        <Center>
          <GroupJoinButton group={props.group} onClick={() => setVisible(true)}/>
        </Center>
    )
  } else {
    return "";
  }
}

function GroupDetailModal(props) {
  return (
      <Modal centered animation={false} backdrop="static" backdropClassName={"backdrop"}
             show={props.visible} onHide={props.onHideCallback}>
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
