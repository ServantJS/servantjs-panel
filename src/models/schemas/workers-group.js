'use strict';

const mongoose = require('mongoose');
const crypto = require("crypto");
const Schema   = mongoose.Schema;

function generateId(pref) {
    var currentDate = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return (pref + crypto.createHash('md5').update(currentDate + random).digest('hex')).toUpperCase();
}

const WorkersGroupSchema = exports.WorkersGroupSchema = new Schema({
    name: String,
    sys_id: {type: String, index: true, unique: true},
    server_id: {type: Schema.Types.ObjectId, ref: 'Server'},
    workers: [{type: Schema.Types.ObjectId, ref: 'Worker'}]
});

WorkersGroupSchema.pre('save', (next) => {
    this.dt = new Date();

    if (!this.sys_id) {
        this.sys_id = generateId('g');
    }

    next();
});

mongoose.model('WorkersGroup', WorkersGroupSchema);