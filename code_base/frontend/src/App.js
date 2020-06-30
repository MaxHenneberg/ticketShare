"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import UserService from "./services/UserService";
import {SearchView} from "./views/SearchView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'TicketShare App',
            routes: [
                { component: SearchView , path: '/', exact: true},
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        //...route == route.component = component, route.path = path, route.exact= exact
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

