"use strict";

import React from 'react';
import Button from "react-bootstrap/Button";
import GroupService from "../services/GroupService";
import GroupJoinModal from "./GroupJoinModal";

class GroupJoinButton extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constr");
    console.log(props.group);
    this.state = {
      group: props.group,
      groupJoinModalVisible: false,
      pricePerPerson: 0
    }
  }

  openGroupJoinModal() {
    this.setState({groupJoinModalVisible: true});
  }

  calcPricePerPerson() {
    let price = this.props.group.ticket.fullPrice / this.props.group.ticket.maxCoveredPeople;
    this.setState({pricePerPerson: price.toFixed(2)})
  }

  componentDidMount(): void {
    this.calcPricePerPerson()
  }

  async handleClose() {
    await GroupService.revertInitGroupJoin(this.state.group).then(result => console.log(result)).catch(error => console.error(error));
    this.setState({groupJoinModalVisible: false});
  }

  render() {
    return (
        <div>
          <Button variant={"primary"}
                  onClick={() => this.openGroupJoinModal()}>X</Button>
          <GroupJoinModal
              visible={this.state.groupJoinModalVisible} group={this.state.group} pricePerPerson={this.state.pricePerPerson}
              onClose={() => this.handleClose()}/>
        </div>
    );
  }
};

export default GroupJoinButton;
