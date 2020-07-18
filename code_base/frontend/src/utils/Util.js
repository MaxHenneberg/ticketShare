import {PersonFill} from "react-bootstrap-icons";
import React from "react";

export default class Utils {
  static isUserCreator(user, group) {
    return user._id === group.creator;
  }

  static isUserJoined(user, joinInformation) {
    for (const info of joinInformation) {
      if (info.joinedUser._id === user._id) {
        return true;
      }
    }
    return false;
  }

  static renderDate(rawDate) {
    if (rawDate) {
      let date = new Date(Date.parse(rawDate));
      //TODO fix incorrect Month
      return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    } else {
      return "-";
    }
  }

  static renderSlots(initialFreeSlots, occSlots) {
    let slotList = [];
    for (let i = 0; i < initialFreeSlots; i++) {
      if (i < occSlots) {
        slotList.push(<PersonFill className="occupiedSlot"/>);
      } else {
        slotList.push(<PersonFill className="freeSlot"/>);
      }
    }
    return slotList;
  }

  static calcPricePerPerson(group) {
    let price = group.ticket.fullPrice / group.ticket.maxCoveredPeople;
    return price.toFixed(2);
  }

}

