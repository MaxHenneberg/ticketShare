"use strict";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Temp.css"

import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {ListView} from "./views/ListView";
import UserView from "./views/UserView";
import CreateGroupView from "./views/CreateGroupView";
import TempGroupView from "./views/TempGroupView";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'TicketShare App',
      routes: [
        {component: ListView, path: '/', exact: true},
        {component: UserView, path: '/user', exact: true},
        {component: CreateGroupView, path: '/group/create', exact: true},
        {component: TempGroupView, path: '/group/temp', exact: true}
      ]
    };
  }

  componentDidMount() {
    document.title = this.state.title;
  }

  render() {
    return (
        <div>
          <Header/>
          <div className="content h d-flex flex-column">
            <Row>
              <Col xs={10}>
                <Router>
                  <Switch>
                    //...route == route.component = component,
                    route.path = path,
                    route.exact= exact
                    {this.state.routes.map(
                        (route, i) => (
                            <Route key={i} {...route}/>))}
                  </Switch>
                </Router>
              </Col>
              <Col xs={2} className="advertisementComponent">
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}

