"use strict";

import React from 'react';
import { Toolbar } from 'react-md';
import { withRouter } from 'react-router-dom'
import logo from '../../public/Logo.png';

import HeaderActions from './HeaderActions';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Toolbar
                    fixed
                    children={<img className="img-responsive" src={logo} height='70' onClick={() => this.props.history.push('/')} />}
                    //nav={<Button onClick={() => this.props.history.push('/')} imageurl="././resources/Logo.png">Image Button</Button>}
                    actions={<HeaderActions id="toolbar-colored-kebab-menu" />}
                    zDepth={0}/>

            </div>

        );
    }
};

export default withRouter(Header);