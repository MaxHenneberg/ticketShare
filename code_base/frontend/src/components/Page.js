"use strict";

import React from 'react';
import { Paper } from 'react-md';
import Header from './Header';
import { Footer } from './Footer';


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <div style={{
                flexDirection: 'column',
            }}>
                <Header title={this.state.title} />
                <Paper
                    style={{
                        flexDirection: 'column',
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {this.props.children}
                </Paper>
                <Footer />
            </div>
        );
    }
}