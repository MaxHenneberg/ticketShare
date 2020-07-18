"use strict";
import React from 'react';
import SearchGroup from "../components/SearchGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import GroupComponent from "../components/group/GroupComponent";
import Spinner from "react-bootstrap/Spinner";
import Center from 'react-center';
import GroupService from "../services/GroupService";
import PromotionCarousel from "../components/PromotedGroups/PromotionCarousel";

export class ListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      groups: null,
      searching: false
    };

    this.searchingCallback = this.searchingCallback.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
  }

  async searchCallback(result) {
    await this.setState({groups: result, searching: false});
  }

  async componentDidMount(): void {
    let initialGroup = null;
    try {
      initialGroup = await GroupService.search({}, 5);
    } catch (e) {
      console.error(e);
    }
    this.setState({groups: initialGroup})
  }

  renderGroups() {
    console.log("Render Groups: ");
    let groupList = [];
    if (this.state.groups) {
      for (const group of this.state.groups) {
        console.log(`${group._id}:${group.name}`);
        groupList.push(<GroupComponent group={group}/>);
      }
    }
    return groupList;
  }

  async searchingCallback() {
    await this.setState({searching: true});
  }

  render() {
    return (
        <div className={"inheritHeight"}>
          <div>
            <Row>
              <Col xs={1}/>
              <Col xs={11}>
                <SearchGroup searchCallback={this.searchCallback} searchingCallback={this.searchingCallback}/>
              </Col>
            </Row>
          </div>
          <Row className={"margin-bottom-medium"}>
            <Col xs={1}/>
            <Col xs={11}>
              <div className={"landingPageBorder"}>
                <PromotionCarousel/>
              </div>
            </Col>
          </Row>
          <div className={"inheritHeight"}>
            <Row className={"inheritHeight"}>
              <Col xs={1} className={"inheritHeight"}/>
              <Col xs={11} className={"inheritHeight"}>
                <div className={"searchResult landingPageBorder"}>
                  {this.state.groups && (this.state.groups.length > 0) && !this.state.searching && this.renderGroups()}
                  {this.state.groups && (this.state.groups.length == 0) && !this.state.searching &&
                  <Center>
                    <div>No Result find for given Parameters!</div>
                  </Center>}
                  {this.state.searching &&
                  <Center>
                    <Spinner animation="border"/>
                  </Center>}
                </div>
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}

export default ListView;
