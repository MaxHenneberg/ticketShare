"use strict";

import React from 'react';

import UserLogin from '../../components/Legacy/UserLogin';

import UserService from '../../services/UserService';


export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
        //only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
        this.state = {};
    }

    async login(user) {
        try {
            let ret = await UserService.login(user.username, user.password);
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
        // UserService.login(user.username, user.password).then((data) => {
        //     this.props.history.push('/');
        // }).catch((e) => {
        //     console.error(e);
        //     this.setState({
        //         error: e
        //     });
        // });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
          <UserLogin onSubmit={(user) => this.login(user)} error={this.state.error}></UserLogin>
        );
    }
}
