"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from 'react-md';
import UserService from "../services/UserService";
import TicketService from "../services/TicketService";
import {withRouter} from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //tickets: this.props.data, TicketService.getTickets().map(({ title }) => title),
            filteredData: []
        }
    }


    /**
     * This custom filter will take the current value and return all matches that start
     * with the value ignoring case and then bold the letters in the search results that
     * match.
     */
    filter(value)  {
        const r = new RegExp(`^${value}`, 'i');
        const l = value.length;
        const filteredData = this.props.data.reduce((matches, ticket) => {
            if (r.test(ticket)) {
                matches.push({
                    label: [
                        <span key="bold" className="md-font-bold">{ticket.substring(0, l)}</span>,
                        ticket.substring(l),
                    ],
                    value: ticket,
                });
            }

            return matches;
        }, []);

        this.setState({ filteredData });
    };

    handleChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }

        this.filter(value);
    };

    handleAutocomplete(value) {
        if (this.props.onAutocomplete) {
            this.props.onAutocomplete(value);
        }

        this.filter(value);
    };

    render() {
        const { filteredData } = this.state;
        return (
            <Autocomplete
                {...this.props}
                id="toolbar-search"
                className="toolbar-search"
                type="search"
                data={filteredData}
                placeholder="Search"
                customSize="search"
                filter={null}
                onChange={this.handleChange}
                onAutocomplete={this.handleAutocomplete}
                block
                dataLabel="label"
                dataValue="value"
                listClassName="toolbar-search__list"
            />
        );
    }
}
Search.propTypes = {
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
};
export default withRouter(Search);