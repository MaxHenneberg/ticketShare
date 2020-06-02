"use strict";

const http = require('http');
const mongoose = require('mongoose');
const LoginModel = require('../src/schema/login');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req,res) => {
    mongoose.connect('mongodb+srv://seba-user:bCufNxJDoGO3otuL@seba-aty2d.mongodb.net/Seba?retryWrites=true&w=majority');
    var login = LoginModel.create({location: 'newTest', browser:'newBrowser'});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    LoginModel.findById('5ed657be7127654e6434b583').exec(l =>{
        res.end(JSON.stringify(l));
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at: ${hostname}:${port}`);
});
