"use strict";

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const BaseAttributes = require('baseAttributes');

const LoginSchema = BaseAttributes.extend({
    location: String,
    browser: String
});

module.exports = mongoose.model('Login', LoginSchema);
