import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

const JwtSecret = 'very secret secret';

let tickets = [
    {
        "id": "888",
        "title" : "Bavaria-Ticket",
        "date" : "01.02.03",
        "price" : "15 Euro",
        "bought" : true
    },
    {
        "id": "999",
        "title" : "Bavaria-Ticket",
        "date" : "01.02.03",
        "price" : "15 Euro",
        "bought" : false
    }
];


export default class TicketsAPISimulator {

    constructor(){

    }

    static getTicketsAsync () {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function () {
                let response = {
                    data: tickets.map((ticket) => {
                        return {id: ticket.id, title: ticket.title, date: ticket.date, price: ticket.price}
                    })
                };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });
    }
    static getTicketByIdAsync (id) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let ticket = {};
                let ticketIndex = tickets.map(ticket => ticket['id']).indexOf(id);
                if (ticketIndex > -1) ticket = tickets[ticketIndex];

                let response = { data: Object.assign({},ticket)};
                resolve(response); // Yay! Everything went well!
            }, 250);
        });
    }
}