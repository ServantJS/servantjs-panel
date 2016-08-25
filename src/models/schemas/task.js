'use strict';

const mongoose = require('mongoose');
const db = require('../../../lib/db');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    worker_id: {type: Schema.Types.ObjectId, ref: 'Worker'},
    stack: String
}, {_id: false});

const TaskSchema = exports.TaskSchema = new Schema({
    dt: Date,
    username: String,

    server_id: {type: Schema.Types.ObjectId, ref: 'Server', index: true},
    //workers: [{type: Schema.Types.ObjectId, ref: 'Worker'}],

    target_id: {type: String},

    status: {type: Number, index: true},
    module: {type: String, index: true},
    cmd: {type: String, index: true},
    params: String,

    internal_error: String,

    error: [ReportSchema],
    report: [ReportSchema]
});

TaskSchema.pre('save', function (next) {
    if (!this.isModified('dt')) {
        this.dt = new Date();
    }

    if (!this.isModified('status')) {
        this.status = -1;
    }

    let search = null;

    if (this.target_id && this.target_id[0] === 'W') {
        search = db.WorkerModel;
    } else if (this.target_id && this.target_id[0] === 'G') {
        search = db.WorkersGroupModel;
    } else if (this.target_id === 'SERVER') {
        return next();
    } else {
        return next(new Error('Unsupported target id'));
    }

    search.findOne({sys_id: this.target_id}, 'server_id', (err, item) => {
        if (err) {
            next(err);
        } else if (!item) {
            next(new Error(`Target "${this.target_id}" not found`));
        } else {
            this.server_id = item.server_id;
            next();
        }
    });
});

mongoose.model('Task', TaskSchema);