"use strict";

import React from 'react';
import Button from "react-bootstrap/Button";
import GroupDetailModal from "./GroupDetailModal";
import GroupService from "../../services/GroupService";

import {InfoCircle} from "react-bootstrap-icons";

class GroupDetailButton extends React.Component {

  static contexType;

  constructor(props) {
    super(props);
    this.state = {
      joinInfos: null,
      infoVisible: false,
      pricePerPerson: 0
    }

    this.onHide = this.onHide.bind(this);
  }

  async calcPricePerPerson() {
    let price = this.props.group.ticket.fullPrice / this.props.group.ticket.maxCoveredPeople;
    await this.setState({pricePerPerson: price.toFixed(2)})
  }

  async componentDidMount(): void {
    try{
      const infos = await GroupService.joinInfosForGroup(this.props.group._id);
      await this.setState({joinInfos: infos});
      await this.calcPricePerPerson();
    }catch (e) {
      console.error(e);
    }
  }

  onHide(){
    this.setState({infoVisible: false});
  }

  render() {
    return (
        <div>
          <Button variant={"success"}
                  onClick={() => this.setState({infoVisible: true})}>Info <InfoCircle/></Button>
          <GroupDetailModal visible={this.state.infoVisible} group={this.props.group} joinInformation={this.state.joinInfos} pricePerPerson={this.state.pricePerPerson} onHideCallback={this.onHide}/>
        </div>
    );
  }
};

export default GroupDetailButton;
