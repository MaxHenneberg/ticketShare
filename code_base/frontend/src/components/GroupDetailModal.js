import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Center from 'react-center';
import React, {useState} from "react";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import GroupInfo from "./GroupInfo";
import GroupJoinButton from "./GroupJoinButton";
import CardDeck from "react-bootstrap/CardDeck";
import JoinedUserCard from "./JoinedUserCard";

function isUserJoined(user, joinInformation) {
  console.log(joinInformation);
  for (const info of joinInformation) {
    console.log("INFO:"+info);
    if (info.joinedUser._id === user._id) {
      return true;
    }
  }
  return false;
};

function loggedInArea(props) {
  if (props.user) {
    if (isUserJoined(props.user, props.joinInformation)) {
      let joinedInfo = [];
      for (const info of props.joinInformation) {
        joinedInfo.push(<JoinedUserCard joinInformation={info}/>)
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
             show={props.visible}>
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
