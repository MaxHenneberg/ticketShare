"use strict";

import React from 'react';
import Button from "react-bootstrap/Button";
import GroupDetailModal from "./GroupDetailModal";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";

class GroupDetailButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      joinInfos: null,
      infoVisible: false,
      pricePerPerson: 0
    }
  }

  async calcPricePerPerson() {
    let price = this.props.group.ticket.fullPrice / this.props.group.ticket.maxCoveredPeople;
    await this.setState({pricePerPerson: price.toFixed(2)})
  }

  async componentDidMount(): void {
    UserService.getCurrentUser().then(result => this.setState({user: result})).catch((e) => console.error(e));
    try{
      const infos = await GroupService.joinInfosForGroup(this.props.group._id);
      await this.setState({joinInfos: infos});
      await this.calcPricePerPerson();
    }catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
        <div>
          <Button variant={"primary"}
                  onClick={() => this.setState({infoVisible: true})}>X</Button>
          <GroupDetailModal visible={this.state.infoVisible} group={this.props.group} user={this.state.user} joinInformation={this.state.joinInfos} pricePerPerson={this.state.pricePerPerson}/>
        </div>
    );
  }
};

export default GroupDetailButton;
