"use strict";

import React from 'react';
import { Toolbar} from 'react-md';

import Search from './Search';
import {TicketList} from "./TicketList";


export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            searching: false,
            search: '',
            results: null };
    }
    startSearching() {
        this.setState({ searching: true });
    };

    stopSearching() {
        this.setState({ searching: false });
    };

    clearSearch() {
        this.setState({ search: '' });
    };

    handleChange(value) {
        this.setState({ search: value });
    };

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.search(this.state.search);
        }
    };

    search(value) {
        const now = Date.now();
        const results =  <TicketList index={i} value={value} key={`${now}-${i}`} />;

        this.setState({ search: value, results });
    };

    render() {
        const { searching, search, results } = this.state;

        return (
                <Toolbar
                    title={
                        <Search
                            value={search}
                            onFocus={this.startSearching}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            onAutocomplete={this.handleAutocomplete}
                        />
                    }
                    zDepth={1}
                />
        );
    }
}
