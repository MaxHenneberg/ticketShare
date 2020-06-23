import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

const JwtSecret = 'very secret secret';

let users = [
    {
        "_id": "89df0ee733c74ce68724c433",
        "username" : "user1",
        "password" : "$2a$08$NP/ZaRzUXLxL6.6JgYTGK.5iF8riGvMnCZ0/Ve/mJonWT1hSgF7EC"
    }
];


export default class UsersAPISimulator {

    constructor(){

    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
           setTimeout(function() {
               let user = {};
               let userIndex = users.map(user => user['username']).indexOf(username);
               if (userIndex == -1) {
                   reject('Invalid credentials');
               }
               else {
                   user = users[userIndex];
                   const isPasswordValid = bcrypt.compareSync(password, user.password);
                   if(!isPasswordValid) {
                       reject('Invalid credentials');
                   }
                   let token = jwt.sign({ id: user._id, username: user.username }, JwtSecret, {
                       expiresIn: 86400 // expires in 24 hours
                   });
                   let response = { token: token};
                   resolve(response); // Yay! Everything went well!
               }
           }, 250);
        });
    }

    static register(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                if(username == undefined || password == undefined) {
                    reject('Bad request');
                }
                else {
                    const user = {
                        '_id': ObjectId(),
                        'username' : username,
                        'password' : bcrypt.hashSync(password, 8)
                    };

                    users.push(user);
                    let token = jwt.sign({ id: user._id, username: user.username }, JwtSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    let response = {
                        token: token
                    };
                    resolve(response); // Yay! Everything went well!
                }
            }, 250);
        });
    }

    static isAuthenticated(token) {
        if (!token) {
            return false;
        }

        // verifies secret and checks exp
        try {
            var decoded = jwt.verify(token, JwtSecret);
            if(decoded != undefined) {
                return true;
            }
            return false;
        }
        catch(err) {
            return false;
        }
    };
}