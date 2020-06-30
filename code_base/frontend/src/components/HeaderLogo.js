"use strict";

import React from 'react';
import { Media } from 'react-md';
import { withRouter } from 'react-router-dom'
import logo from '../../public/Logo.png';


class HeaderLogo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Media aspectRatio="1-1">
                <img className="img-responsive" src={logo} onClick={() => this.props.history.push('/')} />
            </Media>

        );
    }
};

export default withRouter(HeaderLogo);