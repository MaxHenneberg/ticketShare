"use strict";

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const BaseAttributes = require('baseAttributes');

const UserSchema = BaseAttributes.extend({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    UserInformation: {
        surname: String,
        firstname: String,

        birthDate: Date,

        billingAdress: [{
            adress: {
                nickName: String,

                street: String,
                streetNumber: String,
                city: String,
                country: String,
                countryCode: String
            }
        }]
    }
});

module.exports = mongoose.model('User', UserSchema);
