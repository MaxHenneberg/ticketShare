"use strict";

import React from 'react';
import {
    ListItem,
    Avatar,
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
} from 'react-md';
import {Link} from 'react-router-dom';

import UserService from '../services/UserService';
import logo from '../../public/Logo.png';
import {SimpleLink} from "./SimpleLink";

const style = {maxWidth: 600, minWidth: 500};
const avatar = logo;

export class Ticket extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card key={this.props.key}>
                <CardTitle
                    title={<SimpleLink to={`/ticket/${this.props.ticket.id}`}> {this.props.ticket.title}</SimpleLink>}
                    avatar={<Avatar src={avatar} role="presentation"/>}
                />
                <CardActions expander>
                    <Button flat>Action 1</Button>
                    <Button flat>Action 2</Button>
                </CardActions>
                <CardText expandable>
                    <p>
                        Lorem ipsum .
                    </p>
                    <p>
                        Morbi elementum .
                    </p>
                    <p>
                        Integer ante arcu.
                    </p>
                    <p>
                        Aenean bibendum nulla.
                    </p>
                </CardText>
            </Card>


        );
    }
}
