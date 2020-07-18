"use strict";

import React from 'react';
import Button from "react-bootstrap/Button";
import GroupDetailModal from "./GroupDetailModal";
import GroupService from "../../services/GroupService";

import {InfoCircle} from "react-bootstrap-icons";
import Utils from "../../utils/Util";

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
    await this.setState({pricePerPerson: Utils.calcPricePerPerson(this.props.group)})
  }

  async componentDidMount(): void {
    try{
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
          <GroupDetailModal visible={this.state.infoVisible} group={this.props.group} pricePerPerson={this.state.pricePerPerson} onHideCallback={this.onHide}/>
        </div>
    );
  }
};

export default GroupDetailButton;
