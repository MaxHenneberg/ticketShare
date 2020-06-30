"use strict";

import React from 'react';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, List} from 'react-md';

import {Ticket} from './Ticket';
import Page from './Page'


const style = {
    'marginBottom': '36px'
};

export const TicketList = ({data, onDelete}) => (
    <Page>
        {data.map((ticket, i) =>
            <div key={i} style = {style}>
                <section>
                    <Ticket ticket={ticket}/>
                </section>
            </div>)
        }
    </Page>
);

