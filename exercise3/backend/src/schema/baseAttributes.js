"use strict";

const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');

const BaseAttributesSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true
    },
    deleted: Boolean,
    creator: String
});

BaseAttributesSchema.set('versionKey', false);
BaseAttributesSchema.set('timeStamps', true);

module.exports = mongoose.model('BaseAttribute', BaseAttributesSchema);


