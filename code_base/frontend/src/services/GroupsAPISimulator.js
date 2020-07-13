import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

const JwtSecret = 'very secret secret';

let groups = [
    {
        "id": "888",
        "title" : "Bavaria-Group",
        "date" : "01.02.03",
        "price" : "15 Euro",
        "bought" : true
    },
    {
        "id": "999",
        "title" : "Bavaria-Group",
        "date" : "01.02.03",
        "price" : "15 Euro",
        "bought" : false
    }
];


export default class GroupsAPISimulator {

    constructor(){

    }

    static getGroupsAsync () {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function () {
                let response = {
                    data: groups.map((group) => {
                        return {id: group.id, title: group.title, date: group.date, price: group.price}
                    })
                };
                resolve(response); // Yay! Everything went well!
            }, 250);
        });
    }
    static getGroupByIdAsync (id) {
        return new Promise((resolve, reject) => {
            // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
            // In this example, we use setTimeout(...) to simulate async code.
            // In reality, you will probably be using something like XHR or an HTML5 API.
            setTimeout(function(){

                let group = {};
                let groupIndex = groups.map(group => group['id']).indexOf(id);
                if (groupIndex > -1) group = groups[groupIndex];

                let response = { data: Object.assign({},group)};
                resolve(response); // Yay! Everything went well!
            }, 250);
        });
    }
}