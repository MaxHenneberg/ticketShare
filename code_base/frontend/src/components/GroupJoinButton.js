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
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
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

  async handleClose(joinInformation) {
    this.props.callback(joinInformation);
    this.setState({groupJoinModalVisible: false});
  }

  async handleAbort(){
    console.log("ABORT: "+this.state.group._id);
    await GroupService.revertInitGroupJoin(this.state.group._id).then(result => console.log(result)).catch(error => console.error(error));
    this.setState({groupJoinModalVisible: false});
  }

  render() {
    return (
        <div>
          <Button variant={"success"}
                  onClick={() => this.openGroupJoinModal()}>+ Join!</Button>
          <GroupJoinModal
              visible={this.state.groupJoinModalVisible} group={this.state.group} pricePerPerson={this.state.pricePerPerson}
              onClose={this.handleClose} onAbort={this.handleAbort}/>
        </div>
    );
  }
};

export default GroupJoinButton;
