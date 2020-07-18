import AmusementPic from "../../../contrib/img/amusement.jpg";
import TravelPic from "../../../contrib/img/travel.jpg";
import ConcertPic from "../../../contrib/img/concert.jpg";
import MiscPic from "../../../contrib/img/misc.jpg";

import "../GroupInfoModal.css";
import React from "react";
import Image from "react-bootstrap/Image";

function Banner(props) {
  let headerPic;
  switch (props.type) {
    case "Travel":
      headerPic = TravelPic;
      break;
    case "Amusement Park":
      headerPic = AmusementPic;
      break;
    case "Concert":
      headerPic = ConcertPic;
      break;
    default:
      headerPic = MiscPic;
  }

  return <Image src={headerPic} fluid className={"imgBanner"}/>
}

export default Banner;
