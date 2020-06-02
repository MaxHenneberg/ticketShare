"use strict";

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const BaseAttributes = require('../schema/baseAttributes');

const LoginSchema = new mongoose.Schema({
    location: String,
    browser: String
});

module.exports = mongoose.model('Login', LoginSchema);
