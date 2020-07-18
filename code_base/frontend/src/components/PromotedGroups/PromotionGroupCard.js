import Card from "react-bootstrap/Card";
import React from "react";
import Banner from "../GroupDetail/Banner";
import "../GroupInfoModal.css";
import Utils from "../../utils/Util";
import GroupService from "../../services/GroupService";
import GroupDetailModal from "../GroupDetail/GroupDetailModal";

function hideCallback(visible, setVisible) {
  if (visible) {
    setVisible(false);
  }
}

function onClick(visible, setVisible) {
  if (!visible) {
    setVisible(true)
  }
}

function PromotionGroupCard(props) {
  const [visible, setVisible] = React.useState(false);
  return (
      <Card className={"carouselCard"} onClick={() => onClick(visible, setVisible)}>
        <Card.Body>
          <Card.Title>{props.group ? props.group.name : "Fill"}</Card.Title>
          <div>
            <div className={"promotionGroupBannerWrapper margin-bottom-small"}>
              <Banner type={props.group ? props.group.type : "Fill"}/>
            </div>
            <div>
              <span className={"float-sm-left"}>{`Price: ${props.pricePerPerson ? props.pricePerPerson : "-"} ${props.group.ticket.currency ? props.group.ticket.currency.symbol
                  : "-"}`}</span>
            </div>
            <br/>
            <div>
            <span className={"float-sm-left"}>
                  {props.group ? (`Deadline: ${Utils.renderDate(props.group.joinDeadline)}`) : "Fill"}
                </span>
              <span className={"float-sm-right"}>
                  <div>Free Slots:{props.group ? Utils.renderSlots(props.group.ticket.initialFreeSlotsLeft, props.occSlots) : "Fill"}</div>
                </span>
            </div>
          </div>
        </Card.Body>
        <GroupDetailModal visible={visible} group={props.group} pricePerPerson={props.pricePerPerson} onHideCallback={() => hideCallback(visible, setVisible)}/>
      </Card>
  )
}

export default PromotionGroupCard
