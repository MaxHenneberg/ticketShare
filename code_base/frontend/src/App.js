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
import UserService from "./services/UserService";

export const UserContext = React.createContext({
  user: null,
  setUser: () => {}
});

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
      ],
      userContext: {
        user: null,
        setUser: (user) => this.updateUser(user)
      }
    };

    this.updateUser = this.updateUser.bind(this);
  }

  async updateUser(user) {
    let userContext = this.state.userContext;
    userContext.user = user;
    await this.setState({userContext: userContext});
  }

  async componentDidMount() {
    document.title = this.state.title;

    try{
      const user = await UserService.getCurrentUser();
      if(user){
        await this.state.userContext.setUser(user);
      }
    }catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
        <div className="content">
          <UserContext.Provider value={this.state.userContext}>
            <Header/>
            <div>
              <div className={"float-sm-left views"}>
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
              </div>
              <div className={"float-sm-right advertisementComponent"}>
                <Col xs={2}/>
              </div>
            </div>
          </UserContext.Provider>
        </div>
    );
  }
}

