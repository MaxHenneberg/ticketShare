"use strict";

import React from 'react';

import UserLogin from '../components/UserLogin';

import TicketService from '../services/TicketService';
import {TicketList} from "../components/TicketList";
import SearchBar from "../components/SearchBar";


export class SearchView extends React.Component {

    constructor(props) {
        super(props);
        //only allowed in Constructor otherwise use this.setState to not interfere with Reacts logic
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        TicketService.getTickets().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div style={{
                flexDirection: 'column',
            }}>
                <SearchBar data={this.state.data}/>
                <TicketList data={this.state.data}/>
            </div>

    )
        ;
    }
}