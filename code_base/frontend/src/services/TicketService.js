"use strict";

import TicketsAPISimulator from './TicketsAPISimulator';

export default class TicketService {

    constructor() {
    }

    static getTickets() {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await TicketsAPISimulator.getTicketsAsync();
                if (resp.data != undefined) {
                    resolve(resp.data);
                } else {
                    reject('Error while retrieving tickets');
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static getTicket(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await TicketsAPISimulator.getTicketByIdAsync(id);
                if (resp.data != undefined && Object.keys(resp.data).length !== 0) {
                    resolve(resp.data);
                } else {
                    reject('Error while retrieving ticket');
                }
            } catch (err) {
                reject(err);
            }
        });
    }
}